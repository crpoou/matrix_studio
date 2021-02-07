<template>
  <div
    ref="domRef"
    class="over-hidden bg-white cu-step"
    :aria-disabled="currentDisabled"
    :class="{ select: isSelect }"
    @click.stop.exact="SELECT_STEP(step)"
    @click.ctrl.stop.exact="MULTIPLE_SELECT_STEP(step)"
  >
    <template v-if="isInCurrentTab">
      <header class="grid-column-align-center j-content-start p-8 column-gap-8">
        <span class="text-24">{{ step.displayName }}</span>
        <button class="cu-btn" @click.stop="addStepSelf">在前一位增加卡片</button>
        <button
          class="cu-btn ft-chevron-down text-24"
          :class="isEdit ? 'ft-chevron-down' : 'ft-chevron-up'"
          :title="isEdit ? '阅读' : '编辑'"
          @click.stop="TOOGLE_STEP(step)"
        />
        <button class="cu-btn ft-x-circle text-24" title="原地删除" @click="DEL_STEP(step)" />
        <button class="cu-btn ft-slash text-24" title="禁用" @click="FORBID_STEP(step)" />
      </header>
      <div class="bg-pink">校验集合！StepEdit容器右上角的校验汇总</div>
      <ul class="cu-validate">
        <li
          v-for="[key, validate] in ValidateCollection"
          :key="key"
          class="cu-validate__item"
          :validate="!validate.value"
        >
          {{ key }}：{{ validate.value }}
        </li>
        <div class="bg-pink">报错的子卡片的UUID↓</div>
        <li v-for="uuid in ChildValidateMap.get(step.uuid)" :key="uuid" class="cu-validate__item">
          {{ uuid }}
        </li>
      </ul>
    </template>
    <cu-form :step="step" :is-edit="isEdit" />
  </div>
</template>

<script lang="ts">
// <!-- <suspense>
//       <cu-form :step="step" :is-edit="isEdit" />
//       <template #fallback>Loading•••</template>
//     </suspense> -->
import {
  ADD_STEP,
  ChildValidateMap,
  DEL_STEP,
  FORBID_STEP,
  ForbiddenSteps,
  MULTIPLE_SELECT_STEP,
  ON_STEP_BEFORE_UNMOUNT,
  ON_STEP_MOUNTED,
  OpenedSteps,
  SELECT_STEP,
  SelectedSteps,
  TOOGLE_STEP,
  ValidateMap
} from '@store/Cube'
import { ComputedRef, computed, defineComponent, inject, onBeforeUnmount, onMounted, provide, ref } from 'vue'
import { FALSE } from '@share'
import { ICuStepProps } from './interface'
import { ProvideInjectKeyMap } from '@constant'
import { getuuid } from '@utils'

// 空字符取反为true，校验通过，报错字符串取反为false，校验不通过

export default defineComponent({
  name: 'CuStep',
  props: {
    step: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  // @ts-ignore
  setup(props: ICuStepProps) {
    /** 禁用状态默认值，只有第一层卡片才会用到，直接判断ForbiddenSteps */
    const defaultDisabled = computed(() => ForbiddenSteps.has(props.step.uuid))
    /** 拿到上层卡片被禁用状态 */
    const injectDisabled = inject<ComputedRef<boolean>>(ProvideInjectKeyMap.DISABLED, defaultDisabled)
    /** 当前卡片是否被禁用，继承上层卡片的禁用状态 */
    const currentDisabled = computed(() => injectDisabled.value || defaultDisabled.value)
    // 向下注入当前的禁用状态
    provide(ProvideInjectKeyMap.DISABLED, currentDisabled)
    /** 从Flow组件接受注入，是否处于活跃的TAB页中 */
    const isInCurrentTab = inject<ComputedRef<boolean>>(ProvideInjectKeyMap.CURRENT_TAB, computed(FALSE))
    /** 当前卡片是否处于编辑状态 */
    const isEdit = computed(() => OpenedSteps.has(props.step.uuid))
    /** 卡片是否选中 */
    const isSelect = computed(() => SelectedSteps.has(props.step.uuid))
    /** 当前卡片的校验集合，初始化卡片会执行两次，从undefined到有值 */
    const ValidateCollection = computed(() => ValidateMap.get(props.step.uuid))
    // const { ChildValidateCollection } = useChildValidate(props.step)
    /** 卡片的DOM实例 */
    const domRef = ref<HTMLDivElement>()
    /** 没啥用的测试方法 */
    function addStepSelf() {
      const branch = props.step.parent
      if (!branch) return
      ADD_STEP(
        {
          uuid: getuuid(),
          displayName: getuuid()
        },
        branch,
        props.index
      )
    }
    // mounted推送DOM实例
    onMounted(() => ON_STEP_MOUNTED(props.step, { domRef }))
    // unMounted卸载DOM实例
    onBeforeUnmount(() => ON_STEP_BEFORE_UNMOUNT(props.step))
    return {
      domRef,
      addStepSelf,
      DEL_STEP,
      ChildValidateMap,
      FORBID_STEP,
      MULTIPLE_SELECT_STEP,
      SELECT_STEP,
      ValidateCollection,
      SelectedSteps,
      ValidateMap,
      TOOGLE_STEP,
      isInCurrentTab,
      currentDisabled,
      isSelect,
      isEdit
    }
  }
})
</script>
<style lang="scss">
.cu-step {
  border-radius: 6px;
  box-shadow: 1px 1px 4px darkgray;
  transition: all 0.3s ease-in-out;
  will-change: box-shadow;

  &.select {
    box-shadow: 0 0 0 4px slateblue;
  }
}

.cu-validate {
  background-color: cornsilk;

  &__item {
    &[validate='false'] {
      background-color: rgba($color: red, $alpha: 0.1);
    }
  }
}
</style>
