<template>
  <Form :form="form" label-width="40px" :schema="schema" align="vertical">
    <FormItem name="email" label="邮箱" trigger="input">
      <TextInput v-model="form.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem name="password" label="密码" trigger="blur">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormItem, TextInput } from 'li-daisy'
import * as yupInstance from 'yup'
import { ref } from 'vue'

const useYup = () => {
  yupInstance.setLocale({
    string: {
      email: '${path} 必须是有效的邮箱地址',
    },
  })
  return yupInstance
}

const form = ref({
  email: '',
  password: '',
  status: true,
})

const yup = useYup()

const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').min(6).trim(),
})
</script>
