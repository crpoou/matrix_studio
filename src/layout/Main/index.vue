<template>
  <section class="grid over-hidden area-main cu-main">
    <header class="grid area-header column-gap-1 cu-main__header">
      <button class="ft-more-horizontal bg-white text-24 cu-main__menu-left" />
      <button class="ft-plus bg-white text-24 cu-main__menu-right" />
      <cu-tabs />
    </header>
    <cu-canvas />
    <cu-log />
  </section>
</template>

<script lang="ts">
import CuCanvas from '@components/CuCanvas/index.vue'
import CuLog from '@components/CuLog/index.vue'
import CuTabs from '@components/CuTabs/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({ name: 'CuMain', components: { CuTabs, CuCanvas, CuLog } })
</script>
<style lang="scss">
.cu-main {
  grid-template:
    'header' $tabs-size
    'main' 1fr
    'log' auto
    / 1fr;

  &__header {
    z-index: 1;
    grid-template:
      'menu-left tabs menu-right' 1fr
      / #{$tabs-size} 1fr #{$tabs-size};
    box-shadow: 0 $canvas-shadow-size $half #{-$half} $canvas-shadow-color;
  }
  $list: menu-left, menu-right;

  @each $item in $list {
    &__#{$item} {
      grid-area: $item;
    }
  }
}
</style>
