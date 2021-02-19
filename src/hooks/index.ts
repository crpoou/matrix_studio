import { ComputedRef, computed, reactive, watchEffect } from 'vue'
import { ComputedGetter } from '@vue/reactivity'
import { Step } from '@interface'
import { ValidateMap } from '@store/Cube'

/**
 * 创建校验集合
 * @param KeyValidateFunMap 表单字段 -> 校验函数映射
 *
 * 1. 创建校验集合
 * 2. 创建副作用函数，更新校验集合，增加非法字段、移除合法字段
 */
export function useValidate<T = string>(
  KeyValidateFunMap: Map<string, ComputedGetter<T>>
): { ValidateCollection: Map<string, ComputedRef<T>> } {
  const ValidateCollection = reactive(new Map<string, ComputedRef<T>>())
  for (const [key, validateFun] of KeyValidateFunMap) {
    const validateRes = computed(validateFun)
    watchEffect(() => {
      if (validateRes.value) {
        if (ValidateCollection.has(key)) return
        ValidateCollection.set(key, validateRes)
      } else ValidateCollection.delete(key)
    })
  }
  return { ValidateCollection }
}

/**
 * 子卡片的错误
 *
 * @param props
 *
 * 1. 统计第一层出错的子卡片的UUID
 */
export function useChildValidate(props: any): { ChildValidateCollection: Set<string> } {
  /** 错误的子卡片的UUID集合 */
  const ChildValidateCollection = reactive(new Set<string>())
  watchEffect(() => {
    ChildValidateCollection.clear()
    const { branchs } = props.step as Step
    if (branchs) {
      for (const branch of branchs) {
        for (const childStep of branch.steps) {
          const { uuid } = childStep
          const validateCollection = ValidateMap.get(uuid)
          if (validateCollection?.size) {
            // 如果这张子卡有报错，添加，否则跳过
            ChildValidateCollection.add(uuid)
          }
        }
      }
    }
  })
  return { ChildValidateCollection }
}
