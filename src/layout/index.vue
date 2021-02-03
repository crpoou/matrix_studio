<template>
  <div class="grid gap-1 bg-base over-hidden cu-layout">
    <cu-header />
    <cu-nav />
    <cu-aside-left />
    <cu-main />
    <cu-aside-right />
  </div>
</template>

<script lang="ts">
import CuAsideLeft from '@layout/AsideLeft/index.vue'
import CuAsideRight from '@layout/AsideRight/index.vue'
import CuHeader from '@layout/Header/index.vue'
import CuMain from '@layout/Main/index.vue'
import CuNav from '@layout/Nav/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({ name: 'Layout', components: { CuHeader, CuNav, CuAsideLeft, CuMain, CuAsideRight } })
</script>
<style lang="scss">
.cu-layout {
  grid-template:
    'header header header' $header-height
    'nav nav nav' $nav-height
    'aside-left main aside-right' 1fr
    / auto 1fr auto;
  width: 100vw;
  height: 100vh;

  $list: nav, aside-left, aside-right;

  @each $item in $list {
    &__#{$item} {
      grid-area: $item;
    }
  }
}
</style>
