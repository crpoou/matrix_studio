<template>
  <div
    class="grid-center pointer text-12 bg-canvas cu-tabs-item"
    :class="{ select: isInCurrentTab }"
    @click="CHANGE_TAB(step)"
  >
    {{ step.displayName }} {{ ChildValidateCollection.size }}
  </div>
</template>

<script lang="ts">
import { CHANGE_TAB, CurrentFlowUUID } from '@store/Cube'
import { computed, defineComponent } from 'vue'
import { Step } from '@interface'
import { useChildValidate } from '@hooks'

export default defineComponent({
  name: 'CuTabsItem',
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  // @ts-ignore
  setup(props: Readonly<{ step: Step }>) {
    const isInCurrentTab = computed(() => props.step.uuid === CurrentFlowUUID.value)
    const { ChildValidateCollection } = useChildValidate(props)
    return { CHANGE_TAB, isInCurrentTab, ChildValidateCollection }
  }
})
</script>
<style lang="scss">
.cu-tabs-item {
  padding-right: 1em;
  padding-left: 1em;
  white-space: nowrap;

  &:hover,
  &.select {
    color: #409eff;
  }

  &.select {
    background-color: white;
  }
}
</style>
