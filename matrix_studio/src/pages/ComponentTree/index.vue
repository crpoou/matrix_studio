<template>
  <div class="grid row-gap-1 border-left-base visible-auto area-main component-tree">
    <header class="bg-white area-header">标题</header>
    <div class="bg-white area-main">组件树</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({ name: 'ComponentTree' })
</script>
<style lang="scss">
.component-tree {
  grid-template:
    'header' $tabs-size
    'main' 1fr
    / 1fr;
  min-width: 250px;
}
</style>
