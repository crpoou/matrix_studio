<template>
  <button :class="icon" :disabled="disabled" class="grid-center text-12 cu-nav-button">
    {{ label }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CuNavButton',
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean
    }
  }
})
</script>
<style lang="scss">
.cu-nav-button {
  line-height: 1;
  color: #4f596c;

  &::before {
    font-size: 24px;
  }

  &:hover {
    background-color: $canvas-background-color;
  }
}
</style>
