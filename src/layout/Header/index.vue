<template>
  <header class="grid area-header over-hidden bg-white cu-header">
    <div class="self-center text-14 cu-header__main">测试Demo V0.0.1</div>
    <button class="ft-minus cu-header__min" title="最小化" />
    <button
      :title="TitleMap[isFullscreen]"
      :class="IconMap[isFullscreen]"
      class="cu-header__toogle"
      @click="isFullscreen = !isFullscreen"
    />
    <button class="ft-x cu-header__close" title="关闭" />
  </header>
</template>

<script lang="ts">
import { IconMap, TitleMap } from '@constant'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'CuHeader',
  setup() {
    const isFullscreen = ref(false)
    watchEffect(() => {
      if (isFullscreen.value) {
        if (document.fullscreenElement) return
        document.documentElement.requestFullscreen()
      } else if (document.fullscreenElement) document.exitFullscreen()
    })
    return { isFullscreen, IconMap, TitleMap }
  }
})
</script>
<style lang="scss">
.cu-header {
  grid-template-areas: 'main min toogle close';
  grid-template-columns: 1fr repeat(3, 40px);
  grid-auto-flow: column;

  &__main {
    grid-area: main/main/main/close;
    color: #2e3b52;
  }

  &__min {
    grid-area: min;
  }

  &__toogle {
    grid-area: toogle;
  }

  &__min,
  &__toogle {
    &:hover {
      background-color: $base-background-color;
    }
  }

  &__close {
    grid-area: close;

    &:hover {
      color: white;
      background-color: #f74c4c;
    }
  }
}
</style>
