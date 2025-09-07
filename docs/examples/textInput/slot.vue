<template>
  <div class="flex w-full">
    <div class="grid md:grid-cols-2 gap-x-3 m-auto min-w-sm">
      <div>
        <TextInput
          v-for="color in colors"
          :key="color"
          v-model="text"
          class="m-2"
          placeholder="请填写信息"
          :maxlength="20"
          type="search"
          :color="color"
        >
          <template #prefix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
          </template>
          <template #suffix>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
              />
            </svg>
          </template>
        </TextInput>
      </div>

      <div>
        <TextInput
          v-for="color in colors"
          :key="color"
          v-model="text"
          class="m-2"
          placeholder="请填写网站"
          :maxlength="20"
          type="search"
          :color="color"
        >
          <template #prefix> https:// </template>
          <template #suffix> .com </template>
        </TextInput>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TextInput, type TextInputColor } from 'li-daisy'

import { ref } from 'vue'

const colors = ref<TextInputColor[]>([
  'base',
  'neutral',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
])

const text = ref<string>('')
</script>
