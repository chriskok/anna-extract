<template>
  <el-aside
    width="120px"
    class="border-r border-gray-500 flex flex-col items-center"
  >
    <div
      class="
        flex flex-col
        items-center
        my-4
        hover:text-purple-600
        group
        cursor-pointer
        transition
      "
      :class="{
        'text-purple-600': route.path === item.path,
        'text-gray-600': route.path !== item.path,
      }"
      v-for="item in menuItems"
    >
      <div
        :class="{
          'border-gray-400': route.path !== item.path,
          'border-purple-600': route.path === item.path,
          'bg-gray-200': route.path !== item.path,
          'bg-purple-200': route.path === item.path,
        }"
        class="
          rounded-full
          border-1
          flex
          transition
          justify-center
          items-center
          p-2
          mb-1
          group-hover:bg-purple-200 group-hover:border-purple-600
        "
      >
        <component v-bind:is="item.icon" class="text-xs"></component>
      </div>
      <span> {{ item.name }} </span>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { useMenu } from '~/composables/menu'
const { menuItems } = useMenu()
const route = useRoute()
</script>
