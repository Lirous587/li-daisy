<template>
  {{ form }}
  <Form :form="form" label-width="40px" :schema="schema" align="vertical">
    <FormItem name="text" label="文本" trigger="input">
      <TextInput v-model="form.text" placeholder="请输入文本" />
    </FormItem>
    <FormItem name="email" label="邮箱" trigger="input">
      <TextInput v-model="form.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem name="password" label="密码" trigger="blur">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem label="操作">
      <div class="flex flex-col space-y-3">
        <button class="li-btn">触发表单提交</button>
        <button class="li-btn" type="button">无副作用</button>
      </div>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput } from 'li-daisy'

import { ref } from 'vue'

const form = ref({
  text: '',
  email: '',
  password: '',
})

const yup = useYup()
const schema = yup.object({
  text: yup.string().required(),
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').min(6).trim(),
})
</script>
