import { ComputedRef, computed, reactive, watchEffect } from 'vue'
import { ComputedGetter } from '@vue/reactivity'
import { Step } from '@interface'

/**
 * 创建校验集合
 * @param valiDateKeyMap 表单字段 -> 校验函数映射
 *
 * 1. 创建校验集合
 * 2. 创建副作用函数，更新校验集合，增加非法字段、移除合法字段
 */
export function useValidate<T = string>(valiDateKeyMap: Map<string, ComputedGetter<T>>) {
  const ValidateCollection = reactive(new Map<string, ComputedRef<T>>())
  for (const [key, validateFun] of valiDateKeyMap) {
    const validateRes = computed(validateFun)
    watchEffect(() => {
      if (validateRes.value) {
        if (ValidateCollection.has(key)) return
        ValidateCollection.set(key, validateRes)
      } else if (ValidateCollection.has(key)) ValidateCollection.delete(key)
    })
  }
  return { ValidateCollection }
}

export function useChildValidate(step: Step) {
  console.log('step :>> ', step)
}
