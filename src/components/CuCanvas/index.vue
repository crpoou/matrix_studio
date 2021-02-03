<template>
  <main id="cu-canvas" class="grid a-content-start over-hidden bg-canvas cu-canvas" @click="CLEAR_SELECT_STEP">
    <cu-flow v-for="flow in Flows" :key="flow.uuid" :flow="flow" />
  </main>
</template>

<script lang="ts">
import { CLEAR_SELECT_STEP, Flows } from '@store/Cube'
import CuFlow from '@components/CuFlow/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CuCanvas',
  components: { CuFlow },
  setup() {
    return { CLEAR_SELECT_STEP, Flows }
  }
})
</script>

<style lang="scss">
.cu-canvas {
  grid-area: canvas;
  grid-template: 'flow' 1fr / 1fr;
  background-image: radial-gradient($base-background-color 1px, transparent 0);
  background-size: $canvas-shadow-size $canvas-shadow-size;
  box-shadow: $canvas-shadow-size 0 $half #{-$half} inset $canvas-shadow-color, #{-$canvas-shadow-size} 0 $half #{-$half} inset $canvas-shadow-color;
}
</style>
