<template>
  <button
    ref="buttonRef"
    :class="typeClasses"
    class="
      px-4
      py-2
      relative
      overflow-hidden
      transition
      duration-400
      rounded-md
      focus:outline-none
    "
    @click="handleClick"
  >
    <slot name="default"></slot>
    <span
      v-if="showRipple"
      class="ripple bg-opacity-40"
      :class="{
        'bg-purple-500': type === 'secondary',
        'bg-white': type === 'primary',
      }"
      :style="{
        width: `${rippleSize}px`,
        height: `${rippleSize}px`,
        top: `${rippleTop}px`,
        left: `${rippleLeft}px`,
      }"
    ></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validation: (val: string) => {
      return ['primary', 'secondary'].includes(val)
    },
  },
})
const emits = defineEmits(['click'])
// Classes depending on type
const typeClasses = computed(() => {
  if (props.type === 'primary') {
    return 'bg-purple-500 text-white'
  } else {
    return 'border-2 border-opacity-50 border-purple-500 text-purple-500'
  }
})
// Creating ripple effect
const showRipple = ref(false)
const buttonRef = ref<HTMLButtonElement>()
const handleClick = (event: MouseEvent) => {
  createRipple(event)
  emits('click')
}
const rippleSize = ref(0)
const rippleTop = ref(0)
const rippleLeft = ref(0)
const createRipple = async (event: MouseEvent) => {
  if (buttonRef.value) {
    showRipple.value = false
    await nextTick()
    const diameter = Math.max(
      buttonRef.value.clientWidth,
      buttonRef.value.clientHeight
    )
    const radius = diameter / 2
    rippleSize.value = diameter
    rippleLeft.value = event.clientX - (buttonRef.value.offsetLeft + radius)
    rippleTop.value = event.clientY - (buttonRef.value.offsetTop + radius)
    showRipple.value = true
  }
}
</script>

<style scoped>
span.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  animation: ripple 400ms linear;
}
@keyframes ripple {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>
