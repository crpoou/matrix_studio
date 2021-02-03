<template>
  <section
    v-show="isInCurrentTab"
    :key="flow.uuid"
    class="grid-justify-center a-content-start custom-scroll overlay-y visible-auto cu-flow"
  >
    <cu-branch v-for="branch in flow.branchs" :key="branch.uuid" :branch="branch" />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, provide } from 'vue'
import CuBranch from '@components/CuBranch/index.vue'
import { CurrentFlowUUID } from '@store/Cube'
import { ProvideInjectKeyMap } from '@constant'
import { Step } from '@interface'

export default defineComponent({
  name: 'CuFlow',
  components: { CuBranch },
  props: {
    flow: {
      type: Object,
      required: true
    }
  },
  // @ts-ignore
  setup(props: Readonly<{ flow: Step }>) {
    /** 是否处于活跃的TAB页 */
    const isInCurrentTab = computed(() => props.flow.uuid === CurrentFlowUUID.value)
    // 向下注入
    provide(ProvideInjectKeyMap.CURRENT_TAB, isInCurrentTab)
    return { isInCurrentTab }
  }
})
</script>
<style lang="scss">
.cu-flow {
  grid-area: flow;
}
</style>
