<template>
  <div class="space-y-2">
    <p class="font-bold">Form设置align为vertical</p>
    <Form v-model="form" :schema="schema" align="vertical">
      <FormItem name="email" label="用户名" trigger="input">
        <TextInput v-model="form.email" placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="password" label="密码" trigger="blur">
        <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
      </FormItem>
    </Form>

    <p class="font-bold">Form设置align为horizontal</p>
    <Form v-model="form" :schema="schema" align="horizontal">
      <FormItem name="email" label="用户名" trigger="input">
        <TextInput v-model="form.email" placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="password" label="密码" trigger="blur">
        <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
      </FormItem>
    </Form>

    <p class="font-bold">Form设置align为vertical，email项设置align为horizontal</p>
    <Form v-model="form" :schema="schema" align="vertical">
      <FormItem name="email" label="用户名" trigger="input" align="horizontal">
        <TextInput v-model="form.email" placeholder="请输入用户名" />
      </FormItem>
      <FormItem name="password" label="密码" trigger="blur">
        <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
      </FormItem>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput } from 'li-daisy'
import { ref } from 'vue'

const form = ref({
  email: '',
  password: '',
  status: true,
})

const yup = useYup()
const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').min(6).trim(),
  status: yup.bool().isTrue('状态错误'),
})
</script>
