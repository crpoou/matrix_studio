import { Branch, Step, Steps } from '@interface'
import { ComputedRef, Ref, reactive, ref, shallowReactive, watchEffect } from 'vue'
import {
  clearRef,
  convertJsonToFlow,
  createSnapShot,
  getJSON,
  isStep,
  normalizeRef,
  reduceFlowsVoid,
  reduceStepVoid
} from '@utils'
import { EmptyStr } from '@constant'

/** 全局流程数据 */
export const Flows: Ref<Steps> = ref<Steps>(new Set<Step>())
/** 校验集合 */
export const ValidateMap: Map<string, Map<string, ComputedRef<string | boolean>>> = reactive(
  new Map<string, Map<string, ComputedRef<boolean | string>>>()
)
/** 错误子卡片的UUID集合， */
export const ChildValidateMap = reactive(new Map<string, Set<string>>())
/** 卡片Dom实例集合 */
export const DomRefMap: Map<string, Ref<HTMLDivElement | undefined>> = shallowReactive(
  new Map<string, Ref<HTMLDivElement | undefined>>()
)
/** 选中的卡片UUID集合 */
export const SelectedSteps: Set<string> = reactive(new Set<string>())
/** 打开的卡片UUID集合，编辑模式的卡片集合 */
export const OpenedSteps: Set<string> = reactive(new Set<string>())
/** 被禁用的卡片UUID集合 */
// export const ForbiddenSteps: Set<string> = reactive(new Set<string>())
/** 当前选中的TAB页 */
export const CurrentFlowUUID: Ref<string> = ref<string>(EmptyStr)
/** 顶部Tab校验集合？？？ */
export const TabsValidateMap: Set<any> = reactive(new Set<any>())
/** UUID对step数据，branch数据的映射  */
export const UuidMap: Map<string, Step | Branch> = reactive(new Map<string, Step | Branch>())
/** DisplayName  ->  UUID集合 */
export const DisplayNameMap: Map<string, Set<string>> = reactive(new Map<string, Set<string>>())
/** 历史记录栈 */
export const HistoryStack: string[] = reactive<string[]>([])
/** ctrl + shift + z 记录栈 */
export const FutureStack: string[] = reactive<string[]>([])

/** 实时计算UuidMap，不能保留Step和Branch的引用！ */
function CALC_MAP_CB(item: Step | Branch) {
  const { uuid, displayName } = item
  UuidMap.set(uuid, item)
  if (DisplayNameMap.has(displayName)) {
    // @ts-ignore
    DisplayNameMap.get(displayName).add(uuid)
  } else {
    DisplayNameMap.set(displayName, new Set([uuid]))
  }
}

export const CalcCount = ref(0)
/** watchEffect计算副作用函数 */
function CALC_MAP() {
  CalcCount.value++
  UuidMap.clear()
  DisplayNameMap.clear()
  reduceFlowsVoid(Flows, CALC_MAP_CB)
}
// const CALC_MAP_DEBOUNCE = debounce(CALC_MAP, 200)
/** 立即计算关系映射 */
watchEffect(CALC_MAP)

// NOTE: FORM组件生命周期相关处理，注册数据与卸载，等等
/**
 * 卡片创建推送事件
 * @param step
 * @param data
 * @description
 *
 * 1.注册校验集合
 */
export function ON_FORM_MOUNTED(
  step: Step,
  data: {
    /** 校验集合 */
    ValidateCollection: Map<string, ComputedRef<boolean | string>>
    ChildValidateCollection: Set<string>
  }
) {
  const { uuid } = step
  ValidateMap.set(uuid, data.ValidateCollection)
  ChildValidateMap.set(uuid, data.ChildValidateCollection)
}

/**
 * FORM组件卸载推送事件
 * @param step
 * @description
 *
 * 1. 卸载校验集合
 */
export function ON_FORM_BEFORE_UNMOUNT(step: Step) {
  const { uuid } = step
  ValidateMap.delete(uuid)
  ChildValidateMap.delete(uuid)
}

// NOTE: STEP组件生命周期相关处理，注册DOM实例与销毁，等等
/**
 * 卡片创建推送事件
 * @param step
 * @param data
 * @description
 *
 * 1.注册DOM引用
 */
export function ON_STEP_MOUNTED(
  step: Step,
  data: {
    /** STEP组件DOM实例 */
    domRef: Ref<HTMLDivElement | undefined>
  }
) {
  DomRefMap.set(step.uuid, data.domRef)
}

/**
 * STEP组件卸载推送事件
 * @param step
 * @description
 *
 * 1. 卸载DOM引用
 * 2. 卸载选中状态集残留
 * 3. 卸载编辑状态集残留
 * 4. 卸载禁用状态集残留
 */
export function ON_STEP_BEFORE_UNMOUNT(step: Step) {
  const { uuid } = step
  DomRefMap.delete(uuid)
  SelectedSteps.delete(uuid)
  OpenedSteps.delete(uuid)
  // ForbiddenSteps.delete(uuid)
}

// NOTE: 卡片选中与取消选中等逻辑
/**
 * 选中卡片，与其他卡片互斥，先清除再选中
 * @param step 卡片数据
 */
export function SELECT_STEP(step: Step) {
  CLEAR_SELECT_STEP()
  SelectedSteps.add(step.uuid)
}

/**
 * 多选卡片，不进行清空
 * @param step
 */
export function MULTIPLE_SELECT_STEP(step: Step) {
  SelectedSteps.add(step.uuid)
}

/** 清除所有选中卡 */
export function CLEAR_SELECT_STEP() {
  SelectedSteps.clear()
}

/**
 * 一键全选，仅限于当前TAB页的卡片
 */
export function SELECT_ALL_STEP() {
  const currentFlow = UuidMap.get(CurrentFlowUUID.value)
  if (currentFlow) reduceStepVoid.dbs(currentFlow as Step, step => SelectedSteps.add(step.uuid))
}

// NOTE: 表单阅读模式与编辑模式等逻辑
/**
 * 打开卡片，进入编辑模式
 * @param step
 */
export function OPEN_STEP(step: Step) {
  OpenedSteps.add(step.uuid)
}

/**
 * 关闭卡片，进入阅读模式
 * @param step
 */
export function CLOSE_STEP(step: Step) {
  OpenedSteps.delete(step.uuid)
}

/**
 * 切换卡片阅读、编辑模式
 * @param step
 */
export function TOOGLE_STEP(step: Step) {
  OpenedSteps.has(step.uuid) ? CLOSE_STEP(step) : OPEN_STEP(step)
}

/** 清除所有打开的卡片，一键进入阅读模式，优化性能 */
export function CLEAR_OPEN_STEP() {
  OpenedSteps.clear()
}

// NOTE: 卡片禁用逻辑

export function FORBID_STEP(step: Step) {
  step.isDisabled = true
  // ForbiddenSteps.add(step.uuid)
}

export function USE_STEP(step: Step) {
  // ForbiddenSteps.delete(step.uuid)
  step.isDisabled = false
}
// NOTE: 其他基础函数
/**
 * 增量操作flows数据之前，必须调用的前置操作
 *
 * @description
 * 1. 创建当前瞬间的Flows快照
 * 2. JSON.stringify序列化
 * 3. 推入历史记录
 */
function PRE_OPERATION() {
  HistoryStack.push(JSON.stringify(createSnapShot(Flows)))
}

export function GET_DOMUI(step: Step) {
  return DomRefMap.get(step.uuid)?.value
}

export function SEARCH_BY_UUID(uuid: string) {
  if (UuidMap.has(uuid)) return [uuid]
  return []
}

export function SEARCH_BY_DISPLAYNAME(displayName: string) {
  const res = []
  const lower = displayName.toLowerCase()
  for (const [_name, _clo] of DisplayNameMap) if (_name.toLowerCase().includes(lower)) res.push(..._clo)
  return res
}
// NOTE: 之后为复杂业务逻辑 😁🤣

/**
 * 从组件树拖拽生成卡片
 *
 * @param data 初始化卡片数据字典
 * @param branch 生成卡片目标Branch区域
 * @param index 生成卡片目标位置、索引，一般为最后
 * @description
 *
 * 1. data数据传入之前一定要做深拷贝
 * 2. 适用于从组件树生成的卡片，多选移动、单选移动等可能有问题
 * ```ts
 * const newStep = branch.steps[index] = convert(step)
 * ```
 */
export function ADD_STEP(step: any, branch: Branch, index: number) {
  // 1. 生成历史记录
  PRE_OPERATION()
  // 2.判断目标位置是否为branch最后一位
  const { steps } = branch
  if (index === steps.size) {
    // 3.进行引用注入，进行数据结构标椎化，直接进行追加
    steps.add(normalizeRef(step, branch))
  } else {
    /** 生成临时step数组结构 */
    const _steps = [...steps]
    // 3.进行引用注入，进行数据结构标椎化，插入新卡片
    _steps.splice(index, 0, normalizeRef(step, branch))
    // 最后替换原始Set结构
    branch.steps = new Set(_steps)
  }
}

/**
 * 移动多张卡片到目标位置
 *
 * @param steps
 * @param branch
 * @param index
 * @description
 *
 * 1. 组件树拖拽只能有一张！
 * 2. 多选移动或移动有子卡的容器卡
 * 3. 深度未知，分散的多张卡片
 * 4. 等等
 *
 * FIXME: 可能需要重排顺序，数组或选择顺序并不等于视图上的顺序，按照流程中卡片既有顺序重排
 */
export function ADD_STEPS(steps: any[] | Set<any>, branch: Branch, index: number) {
  // console.log('{ steps, branch, index } :>> ', { steps, branch, index })
  // 1. 生成历史记录
  PRE_OPERATION()
  // 2.去除所有引用注入，生成新一份json
  const newSteps = JSON.parse(JSON.stringify([...steps].map(clearRef)))
  // 3.判断目标位置是否为branch最后一位
  const { steps: branchSteps } = branch
  if (index === branchSteps.size) {
    // 4.进行引用注入，进行数据结构标准化，同时追加在branch最后
    for (const newStep of newSteps) branchSteps.add(normalizeRef(newStep, branch))
  } else {
    // 4.进行引用注入，进行数据结构标准化
    for (const newStep of newSteps) normalizeRef(newStep, branch)
    const _branchSteps = [...branchSteps]
    _branchSteps.splice(index, 0, ...newSteps)
    branch.steps = new Set(_branchSteps)
  }
}

/**
 * 删除所有选中的卡片
 *
 * @description
 *
 */
export function DEL_STEPS() {
  PRE_OPERATION()
  for (const uuid of SelectedSteps) {
    const item = UuidMap.get(uuid)
    if (isStep(item)) item.parent?.steps.delete(item)
  }
  SelectedSteps.clear()
}

// NOTE: 撤销重做等逻辑，Ctrl + Z 和 Ctrl + Shift + Z更容易理解
/**
 * ctrl + z
 *
 * @description
 *
 * 1. 同理创建快照，只不过是往FutureStack栈中追加
 * 2. 弹出历史记录中一项
 * 3. 全量替换全局流程数据
 */
export function GO_BACK() {
  if (!HistoryStack.length) return
  FutureStack.push(JSON.stringify(createSnapShot(Flows)))
  const temp = HistoryStack.pop()
  if (temp) Flows.value = convertJsonToFlow(JSON.parse(temp))
}

/**
 * ctrl + shift + z
 *
 * @description
 *
 * 1. 等同与增量操作，调动前置操作
 * 2. 弹出FutureStack栈中一项
 * 3. 全量替换全局流程数据
 */
export function GO_TO() {
  if (!FutureStack.length) return
  PRE_OPERATION()
  const temp = FutureStack.pop()
  if (temp) Flows.value = convertJsonToFlow(JSON.parse(temp))
}

/**
 * 切换选中Tab
 * @param flow
 * @description
 *
 * 切换选中页时，取消选中所有卡
 */
export function CHANGE_TAB(flow: Step) {
  CurrentFlowUUID.value = flow.uuid
  SelectedSteps.clear()
}

// NOTE: 没啥用的方法

/**
 * 删除STEP、点击STEP删除按钮，原地删除
 * @param step
 * @description 所有增量更新的操作，都需要进行历史记录标准操作
 */
export function DEL_STEP(step: Step) {
  PRE_OPERATION()
  step.parent?.steps.delete(step)
}

/**
 * 一键打开所有卡片，一键进入编辑模式
 *
 * @description
 *
 * 不在视图的内卡片当然会被记录进入编辑模式，但是不会有效果，也不会渲染
 */
export function OPEN_ALL_STEP() {
  for (const uuid of UuidMap.keys()) OpenedSteps.add(uuid)
}

/** 刷新FLOWS数据，测试使用 */
export function RefreshFlows() {
  getJSON().then(data => {
    Flows.value = convertJsonToFlow(data)
  })
}
