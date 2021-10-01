<template>
  <div class="flex flex-col h-full">
    <div class="flex mb-10">
      <back-button class="mr-16" />
      <my-stepper :steps="steps" :active-index="newTemplateStep" />
    </div>
    <div class="flex flex-grow">
      <div
        class="
          w-7/10
          border-2 border-purple-500
          h-full
          flex
          justify-center
          items-center
          flex-col
          relative
        "
      >
        <div v-if="newTemplateImage" class="relative">
          <img :src="newTemplateImage" ref="templateImgRef" />
          <template-markers :scale="templateScale" />
        </div>
        <div v-if="newTemplateImage"></div>
        <div v-else class="flex flex-col w-1/2">
          <span class="text-2xl text-center text-gray-500 mb-6"
            >The photo should have adequate lightning and should be as straight
            as possible</span
          >

          <file-uploader
            button-text="Add sample document"
            @upload="handleTemplateUpload"
          />
        </div>
      </div>
      <template v-if="newTemplateStep === 0">
        <div class="w-3/10 flex flex-col pl-5" v-if="!newTemplateImage">
          <h5 class="text-xl mb-4">Upload Sample Document</h5>
          <span class="text-gray-500 text-lg mb-4">
            To start creating a new template, first upload an image on the left
            box
          </span>
          <my-button type="secondary">
            <div class="flex items-center justify-center">
              <span>Next</span><i-carbon-caret-right />
            </div>
          </my-button>
        </div>
        <div class="w-3/10 flex flex-col pl-5" v-else>
          <h5 class="text-xl mb-4">Upload Sample Document</h5>
          <span class="text-gray-500 text-lg mb-4">
            Alright, you successfully uploaded an image. Now check if you
            selected the correct image and we can move on!
          </span>
          <my-button type="primary" @click="newTemplateStep = 1">
            <div class="flex items-center justify-center">
              <span>Next</span><i-carbon-caret-right />
            </div>
          </my-button>
        </div>
      </template>
      <template v-else-if="newTemplateStep === 1">
        <label-list />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAnnotations } from '~/composables/annotations'
import { newTemplateStep, useTemplates } from '~/composables/templates'

const { steps, newTemplateImage, setNewTemplate } = useTemplates()
const templateImgRef = ref<HTMLImageElement>()

const { initAnnotations } = useAnnotations()
const templateScale = ref(0)
const handleTemplateUpload = async (files: FileList) => {
  setNewTemplate(files)
  await nextTick()
  initAnnotations(templateImgRef.value!)
  const tempImg = new Image()
  tempImg.src = URL.createObjectURL(files[0])
  tempImg.onload = () => {
    templateScale.value = templateImgRef.value?.width! / tempImg.width
  }
}
</script>

<style scoped></style>
