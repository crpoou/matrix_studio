<template>
  <aside class="grid gap-1 over-hidden cu-layout__aside-right cu-aside-right">
    <header class="bg-white area-header cu-aside-right__header" />
    <div class="bg-white area-main" />
  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CuAsideRight'
})
</script>
<style lang="scss">
.cu-aside-right {
  grid-template:
    'header' $tabs-size
    'main' 1fr
    / 1fr;
  width: $tabs-size;
  transition: width 0.3s ease-in-out;
}
</style>
