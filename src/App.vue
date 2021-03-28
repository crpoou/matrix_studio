<template>
  <router-view />
  <teleport to="body">
    <transition name="fade">
      <div v-if="$store.state.loading" class="grid-center area-main cu-loading">
        <i class="text-64 text-red ft-loader cu-loading__icon" />
      </div>
    </transition>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
<style lang="scss">
.cu-loading {
  z-index: 1;
  background-color: rgba(black, 0.5);

  &__icon {
    animation: rotateLoading 3s infinite linear;
    will-change: transform;
  }

  @keyframes rotateLoading {
    to {
      transform: rotate(1turn);
    }
  }
}
</style>
