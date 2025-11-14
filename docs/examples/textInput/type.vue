<template>
  <div class="flex flex-col gap-y-4">
    <TextInput v-model="text" placeholder="请输入文本" type="text" />
    <TextInput v-model="password" placeholder="请输入密码" type="password" />
    <TextInput v-model="email" placeholder="请输入邮件" type="email" />
    <TextInput v-model="url" placeholder="请输入URL" type="url" />
    <TextInput v-model="tel" placeholder="请输入电话" type="tel" />
    <TextInput v-model="search" placeholder="请输入搜索内容" type="search" />
    <TextInput v-model="number" placeholder="请输入数字" type="number" />
  </div>
</template>

<script setup lang="ts">
import { TextInput } from '../../../packages'
import { ref } from 'vue'

const text = ref('')
const password = ref('')
const email = ref('')
const url = ref('')
const tel = ref('')
const search = ref('')
const number = ref<number>(0)
</script>
