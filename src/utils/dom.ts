import { Branch, Step } from '@interface'
import { CHANGE_TAB, GET_DOM_UI, OPEN_STEP, SELECT_STEP } from '@store/Cube'
import { ScrollIntoViewCenter, ScrollIntoViewStart } from '@constant/dom'
import { isStep } from '@utils'
import { nextTick } from 'vue'

/**
 * 滚动卡片或分支置视图中央
 * @param item Step数据或branch数据
 * @description
 *
 * 1. 位于flow一级的卡片，直接滚动
 * 2. 当卡片属于容器卡的子卡时，容器卡可能为阅读模式，目标卡片高度为零
 * 3. 设置目标卡片的容器卡位编辑模式，然后在进行滚动视图
 * 4. 同理，容器卡可以多重嵌套，需要找到最外层的容器，全部置为编辑模式
 */
export function scrollDomIntoView(item: Step | Branch): void {
  /** 画布区域，ID为CuCanvas组件写死的 */
  const Canvas = document.getElementById('cu-canvas') as HTMLElement
  const targetStep = isStep(item) ? item : item.parent
  const DomUI = GET_DOM_UI(targetStep)
  if (!DomUI) return
  CHANGE_TAB(item.flow)
  for (let step = targetStep; step.parent; step = step.parent.parent) OPEN_STEP(step)

  nextTick(() => {
    DomUI.clientHeight < Canvas.clientHeight
      ? DomUI.scrollIntoView(ScrollIntoViewCenter)
      : DomUI.scrollIntoView(ScrollIntoViewStart)
    SELECT_STEP(targetStep) // 最后选中目标卡片
  })
}
