<template>
  <footer class="bg-white cu-log">
    <button class="cu-btn" @click="toogle">切换</button>
    <transition name="eio-height">
      <div v-if="logOpen" class="height200" />
    </transition>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CuLog',
  setup() {
    const logOpen = ref(false)
    function toogle() {
      logOpen.value = !logOpen.value
    }
    return { logOpen, toogle }
  }
})
</script>

<style lang="scss">
.cu-log {
  z-index: 1;
  grid-area: log;
  box-shadow: 0 #{-$canvas-shadow-size} $half #{-$half} $canvas-shadow-color;
}

.height200 {
  height: 200px;
}
</style>
