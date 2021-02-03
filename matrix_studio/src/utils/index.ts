import { Branch, ReduceFlowsVoidCb, ReduceStepVoidCb, Step, Steps } from '@interface'
import { Ref } from 'vue'
export { v4 as getuuid } from 'uuid'

// NOTE: utils尽量不要导入外部数据
// NOTE: 只使用形参
/**
 * json数据转数据结构
 * @param json
 */
export function convertJsonToFlow(json: any): Steps {
  for (const flow of json) convertJsonToFlow.dbs(flow, flow)
  return new Set(json)
}
/**
 *
 * @param step 也可以传入json对象，类似Step数据
 * @param flow 所属flow
 */
convertJsonToFlow.dbs = function (step: Step, flow: Step) {
  if (!step.branchs) return
  step.branchs = new Set(step.branchs)
  for (const branch of step.branchs) {
    branch.parent = step
    branch.flow = flow
    convertJsonToFlow.dss(branch, flow)
  }
}
/**
 *
 * @param branch 分支对象
 * @param flow 所属flow
 */
convertJsonToFlow.dss = function (branch: Branch, flow: Step) {
  branch.steps = new Set(branch.steps)
  for (const step of branch.steps) {
    step.parent = branch
    step.flow = flow
    convertJsonToFlow.dbs(step, flow)
  }
}

/**
 * 数据结构转json数据
 * @description
 * 1. 生成快照、去除循环引用
 * 2. 并不等于深拷贝
 * 3. 返回的数据不要保持引用，使用前需要做
 * ```ts
 * JSON.parse(JSON.stringify($1))
 * ```
 */
export function convertFlowToJson(Flows: Steps): any {
  return [...Flows].map(convertFlowToJson.dbs)
}
convertFlowToJson.dbs = function (step: Step): any {
  const _step = { ...step }
  // @ts-ignore
  _step.parent = _step.flow = null
  const branch = _step.branchs
  // @ts-ignore
  if (branch) _step.branchs = [...branch].map(convertFlowToJson.dss)
  return _step
}
convertFlowToJson.dss = function (branch: Branch): any {
  const _branch = { ...branch }
  // @ts-ignore
  _branch.parent = _branch.flow = null
  // @ts-ignore
  _branch.steps = [..._branch.steps].map(convertFlowToJson.dbs)
  return _branch
}

export function reduceStepVoid(flows: Ref<Steps>, callback: ReduceStepVoidCb) {
  for (const flow of flows.value) reduceStepVoid.dbs(flow, callback)
}
reduceStepVoid.dbs = function (step: Step, callback: ReduceStepVoidCb) {
  const { branchs } = step
  if (branchs) for (const branch of branchs) reduceStepVoid.dss(branch, callback)
}
reduceStepVoid.dss = function (branch: Branch, callback: ReduceStepVoidCb) {
  for (const step of branch.steps) {
    callback(step)
    reduceStepVoid.dbs(step, callback)
  }
}

export function reduceFlowsVoid(flows: Ref<Steps>, callback: ReduceFlowsVoidCb) {
  for (const flow of flows.value) {
    callback(flow)
    reduceStepVoid.dbs(flow, callback)
  }
}
reduceFlowsVoid.dbs = function (step: Step, callback: ReduceFlowsVoidCb) {
  const { branchs } = step
  if (!branchs) return
  for (const branch of branchs) {
    callback(branch)
    reduceStepVoid.dss(branch, callback)
  }
}
reduceFlowsVoid.dss = function (branch: Branch, callback: ReduceFlowsVoidCb) {
  for (const step of branch.steps) {
    callback(step)
    reduceStepVoid.dbs(step, callback)
  }
}

/**
 * 引用注入，数据结构标椎化
 * @param step
 * @param branch
 */
export function normalizeRef(step: any, branch: Branch): Step {
  step.parent = branch
  step.flow = branch.flow
  convertJsonToFlow.dbs(step, branch.flow)
  return step
}

/**
 * 清除数据结构引用注入
 *
 * @param step
 * @description
 *
 * 1. 等同convertFlowToJson简化版
 */
export function clearRef(step: Step): any {
  return convertFlowToJson.dbs(step)
}

/** 创建全流程快照 */
export function createSnapShot(flows: Ref<Steps>) {
  return convertFlowToJson(flows.value)
}

/** 测试使用fetch JSON数据 */
export async function getJSON() {
  const res = await fetch('/flow.json')
  const data = await res.json()
  convertJsonToFlow(data)
  return data
}

export function isBranch(item: Step | Branch | undefined): item is Branch {
  return item ? !!item.steps : false
}

export function isStep(item: Step | Branch | undefined): item is Step {
  return item ? !item.steps : false
}
