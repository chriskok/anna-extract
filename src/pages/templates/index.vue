<template>
  <div>
    <div class="flex items-center mb-8 w-full justify-between">
      <div class="flex items-center">
        <h5 class="text-xl mr-4">Templates</h5>
        <my-button class="py-1 px-3 rounded-full text-sm font-bold">
          <div class="flex items-center"><i-mdi-plus /> New Template</div>
        </my-button>
      </div>
      <div class="flex items-center">
        <el-input class="mr-4" placeholder="Search or filter" />
        <my-button type="secondary" class="w-50">Upload File</my-button>
      </div>
    </div>
    <p class="text-gray-600">
      Select a template to use from below and upload your file to start
      extracting information.
    </p>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
