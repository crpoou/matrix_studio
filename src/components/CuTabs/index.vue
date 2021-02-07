<template>
  <nav class="grid-column j-content-start overlay-x scroll-none bg-canvas cu-tabs">
    <section class="grid-column j-content-start bg-base column-gap-1">
      <cu-tabs-item v-for="flow in Flows" :key="flow.uuid" :step="flow" />
    </section>
  </nav>
</template>

<script lang="ts">
import { CurrentFlowUUID, Flows } from '@store/Cube'
import { defineComponent, nextTick, watchEffect } from 'vue'
import CuTabsItem from '@components/CuTabsItem/index.vue'

export default defineComponent({
  name: 'CuTabs',
  components: { CuTabsItem },
  setup() {
    // 首屏自动选中第一页
    const initCurrentFlowStopHandle = watchEffect(() => {
      if (CurrentFlowUUID.value) {
        nextTick(() => {
          initCurrentFlowStopHandle()
        })
      } else {
        for (const flow of Flows.value) {
          CurrentFlowUUID.value = flow.uuid
          break
        }
      }
    })
    return { Flows }
  }
})
</script>
<style lang="scss">
.cu-tabs {
  grid-area: tabs;
}
</style>
