import { Branch, ReduceFlowsVoidCb, ReduceStepVoidCb, Step, Steps } from '@interface'
import { Ref } from 'vue'

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

export function reduceStepVoid(flows: Ref<Steps>, callback: ReduceStepVoidCb): void {
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

export function reduceFlowsVoid(flows: Ref<Steps>, callback: ReduceFlowsVoidCb): void {
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

/** 测试使用fetch JSON数据 */
export async function getJSON(): Promise<any> {
  const res = await fetch('/flow.json')
  const data = await res.json()
  return data
}

export function isBranch(item: Step | Branch | undefined): item is Branch {
  return item ? !!item.steps : false
}

export function isStep(item: Step | Branch | undefined): item is Step {
  return item ? !item.steps : false
}

const blackList = new Set(['parent', 'flow'])
function stringifyReplacer(key: string, value: any) {
  return blackList.has(key) ? undefined : value
}

export function stringify(value: any): string {
  return JSON.stringify(value, stringifyReplacer)
}

export function parse(text: string): any {
  return JSON.parse(text)
}

export function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value, stringifyReplacer))
}
