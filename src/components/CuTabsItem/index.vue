<template>
  <div
    class="grid-center pointer text-12 bg-canvas cu-tabs-item"
    :class="{ select: isInCurrentTab }"
    @click="CHANGE_TAB(flow)"
  >
    {{ flow.displayName }}
  </div>
</template>

<script lang="ts">
import { CHANGE_TAB, CurrentFlowUUID } from '@store/Cube'
import { computed, defineComponent } from 'vue'
import { Step } from '@interface'

export default defineComponent({
  name: 'CuTabsItem',
  props: {
    flow: {
      type: Object,
      required: true
    }
  },
  // @ts-ignore
  setup(props: Readonly<{ flow: Step }>) {
    const isInCurrentTab = computed(() => props.flow.uuid === CurrentFlowUUID.value)
    return { CHANGE_TAB, isInCurrentTab }
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
