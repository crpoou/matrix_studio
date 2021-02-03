<template>
  <router-view />
  <teleport to="body">
    <div v-if="loading" class="grid-center cu-loading">
      <i class="text-64 text-red ft-loader cu-loading__icon" />
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'App',
  setup() {
    const loading = ref(false)
    return { loading }
  }
})
</script>
<style lang="scss">
.cu-loading {
  position: fixed;
  inset: 0;
  background-color: rgba(black, 0.5);

  &__icon {
    will-change: transform;
    animation: rotateLoading 3s infinite linear;
  }

  @keyframes rotateLoading {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
