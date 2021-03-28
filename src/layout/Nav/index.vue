<template>
  <nav class="grid-column column-gap-32 j-content-start bg-white cu-layout__nav">
    <div class="grid-column column-gap-1 over-hidden bg-base cu-nav__project">
      <button class="ft-arrow-left text-grey text-32 cu-nav__back" />
      <i class="grid-center ft-file-text text-blue text-32 bg-white" />
      <div class="grid-align-center bg-white"><span class="text-ellipsis">华畅-COSCO补料机器人</span></div>
    </div>
    <div class="grid-column column-gap-16 cu-nav__group">
      <cu-nav-button icon="ft-save" label="保存" disabled />
      <cu-nav-button icon="ft-package" label="打包" disabled />
      <cu-nav-button
        icon="ft-corner-up-left"
        :label="`撤销${HistoryStack.length}`"
        :disabled="!HistoryStack.length"
        @click="GO_BACK"
      />
      <cu-nav-button
        icon="ft-corner-up-right"
        :label="`重做${FutureStack.length}`"
        :disabled="!FutureStack.length"
        @click="GO_TO"
      />
      <cu-nav-button icon="ft-refresh-ccw" label="刷新" @click="RefreshFlows" />
      <cu-nav-button :label="`UuidMap重算计次${CalcCount}次`" disabled />
      <cu-nav-button icon="ft-credit-card" label="一键阅读" @click="CLEAR_OPEN_STEP" />
      <cu-nav-button icon="ft-edit" label="一键编辑" @click="OPEN_ALL_STEP" />
      <cu-nav-button icon="ft-delete" label="一键删除" @click="DEL_STEPS" />
      <cu-nav-button icon="ft-copy" label="一键全选" @click="SELECT_ALL_STEP" />
      <cu-nav-button icon="ft-copy" label="测试弹窗" @click="showToast" />
    </div>
    <cu-global-search />
  </nav>
</template>

<script lang="ts">
import {
  CLEAR_OPEN_STEP,
  CalcCount,
  DEL_STEPS,
  FutureStack,
  GO_BACK,
  GO_TO,
  HistoryStack,
  OPEN_ALL_STEP,
  RefreshFlows,
  SELECT_ALL_STEP
} from '@store/Cube'
import CuGlobalSearch from '@components/CuGlobalSearch/index.vue'
import CuNavButton from '@components/CuNavButton/index.vue'
import { StateMutations } from '@constant'
import { defineComponent } from 'vue'
import { useStore } from '@store'

export default defineComponent({
  name: 'CuNav',
  components: { CuNavButton, CuGlobalSearch },
  setup() {
    const store = useStore()
    function hiddenToast() {
      store.commit(StateMutations.HIDDEN_TOAST)
    }
    function showToast() {
      store.commit(StateMutations.SHOW_TOAST)
      setTimeout(hiddenToast, 1500)
    }
    return {
      CLEAR_OPEN_STEP,
      CalcCount,
      DEL_STEPS,
      FutureStack,
      GO_BACK,
      GO_TO,
      HistoryStack,
      OPEN_ALL_STEP,
      RefreshFlows,
      SELECT_ALL_STEP,
      showToast
    }
  }
})
</script>
<style lang="scss">
.cu-nav {
  &__project {
    grid-template-columns: $tabs-size $tabs-size 1fr;
    width: 250px;
  }

  &__back {
    background-color: seagreen;
  }

  &__group {
    grid-auto-columns: $nav-height;
  }
}
</style>
