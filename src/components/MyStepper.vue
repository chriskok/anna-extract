<template>
  <div class="flex">
    <div v-for="(step, i) in steps" class="text-gray-500 mr-4">
      <span :class="{ 'text-purple-500': i === activeIndex }"
        >{{ i + 1 }}. {{ step.name }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Step } from '~/types/customTypes'

defineProps({
  steps: {
    type: Array as PropType<Step[]>,
    required: true,
  },
  activeIndex: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped></style>
