<template>
  <section v-if="branch.steps.size" class="grid-justify-center a-content-start row-gap-24 p-24">
    <cu-step v-for="(step, index) in branch.steps" :key="step.uuid" :step="step" :index="index" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CuBranch',
  props: {
    branch: {
      type: Object,
      required: true
    }
  }
})
</script>
