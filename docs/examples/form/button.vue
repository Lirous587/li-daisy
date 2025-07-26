<template>
  <Form v-model="form" label-width="40px" :schema="schema" align="vertical">
    <FormItem name="email" label="用户名" trigger="input">
      <TextInput v-model="form.email" placeholder="请输入用户名" />
    </FormItem>
    <FormItem name="password" label="密码" trigger="blur">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem label="操作">
      <div class="flex flex-col space-y-3">
        <button class="btn">触发表单提交</button>
        <button class="btn" type="button">无副作用</button>
      </div>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput } from 'li-daisy'
import { ref } from 'vue'

const form = ref({
  email: '',
  password: '',
})

const yup = useYup()
const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').min(6).trim(),
})
</script>
