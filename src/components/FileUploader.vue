<template>
  <my-button
    ref="buttonRef"
    type="secondary"
    class="text-lg"
    @click="inputRef.click()"
    >Add sample document</my-button
  >
  <input
    ref="inputRef"
    type="file"
    @change="uploadFiles"
    :multiple="multiple"
    @click="emits('click')"
    class="hidden"
  />
</template>

<script setup lang="ts">
defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    required: true,
  },
})
const inputRef = ref()
const emits = defineEmits(['upload', 'click'])
const uploadFiles = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length) {
    emits('upload', input.files)
  }
}
</script>
