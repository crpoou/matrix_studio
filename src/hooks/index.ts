import { ComputedRef, computed, reactive, watchEffect } from 'vue'
import { ComputedGetter } from '@vue/reactivity'
import { Step } from '@interface'

// eslint-disable-next-line no-unused-vars
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
