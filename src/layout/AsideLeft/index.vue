<template>
  <aside class="grid cu-layout__aside-left cu-aside-left" :class="{ 'cu-aside-left--close': !$store.state.asideLeftOpen }">
    <nav class="grid a-content-space-between overlay-y scroll-none bg-canvas cu-aside-left__tabs left-tabs">
      <section class="grid bg-base row-gap-1">
        <div
          v-for="(className, key) in ComponentList"
          :key="key"
          class="grid-center pointer text-28 text-crimson bg-canvas ft-grid left-tabs__item"
          :class="[className, { select: key === componentName }]"
          @click="componentName = key"
        />
        <div class="grid-center pointer text-28 text-green bg-canvas ft-layout left-tabs__item" />
        <div class="grid-center pointer text-28 text-purple bg-canvas ft-layers left-tabs__item" />
      </section>
      <button class="left-tabs__item ft left-tabs__toogle" @click="handleToogle" />
    </nav>
    <component :is="componentName" v-if="$store.state.asideLeftOpen" />
  </aside>
</template>

<script lang="ts">
import { ComponentList, StateMutations } from '@constant'
import { defineComponent, ref } from 'vue'
import ComponentTree from '@pages/ComponentTree/index.vue'
import VariablePool from '@pages/VariablePool/index.vue'
import { useStore } from '@store'

export default defineComponent({
  name: 'CuAsideLeft',
  components: { ComponentTree, VariablePool },
  setup() {
    const store = useStore()
    const componentName = ref('ComponentTree')
    function handleToogle() {
      store.commit(StateMutations.TOGGLE_ASIDE_LEFT)
    }
    return { handleToogle, ComponentList, componentName }
  }
})
</script>
<style lang="scss">
.left-tabs {
  &__item {
    min-height: $tabs-size;
    transition: 0.3s ease-in-out;
    will-change: background-color, color, transform;

    &:hover,
    &.select {
      color: #409eff;
    }

    &.select {
      background-color: white;
    }
  }

  &__toogle {
    transition: transform 0.3s ease-in-out;

    &::before {
      content: '\e92c';
    }
  }
}

.cu-aside-left {
  position: relative;
  grid-template:
    'tabs main' 1fr
    / #{$tabs-size} 1fr;
  min-width: 300px;
  max-width: 600px;
  overflow: hidden;
  resize: horizontal;

  &--close {
    width: $tabs-size !important;
    min-width: $tabs-size;
    resize: none;

    .left-tabs__toogle {
      transform: rotate(0.5turn);
    }
  }

  &__tabs {
    grid-area: tabs;
  }
}
</style>
