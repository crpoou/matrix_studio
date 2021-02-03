<template>
  <nav class="grid-column j-content-start overlay-x scroll-none bg-canvas cu-tabs">
    <section class="grid-column j-content-start bg-base column-gap-1">
      <div
        v-for="flow in Flows"
        :key="flow.uuid"
        class="grid-center pointer text-12 bg-canvas cu-tabs__item"
        :class="{ select: CurrentFlowUUID === flow.uuid }"
        @click="CHANGE_TAB(flow)"
      >
        {{ flow.displayName }}
      </div>
    </section>
  </nav>
</template>

<script lang="ts">
import { CHANGE_TAB, CurrentFlowUUID, Flows } from '@store/Cube'
import { defineComponent, nextTick, watchEffect } from 'vue'

export default defineComponent({
  name: 'CuTabs',
  setup() {
    // 首屏自动选中第一页
    const initCurrentFlowStopHandle = watchEffect(() => {
      if (CurrentFlowUUID.value) {
        nextTick(() => {
          initCurrentFlowStopHandle
        })
      } else {
        for (const flow of Flows.value) {
          CurrentFlowUUID.value = flow.uuid
          break
        }
      }
    })
    return { CHANGE_TAB, CurrentFlowUUID, Flows }
  }
})
</script>
<style lang="scss">
.cu-tabs {
  grid-area: tabs;

  &__item {
    min-width: $tabs-size;
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
}
</style>
