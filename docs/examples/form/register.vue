<template>
  <Form v-model="form" ref="formRef" :schema="schema" align="vertical">
    <FormItem name="email" label="用户名" trigger="input">
      <TextInput v-model="form.email" placeholder="请输入用户名" />
    </FormItem>
    <FormItem name="password" label="密码" trigger="blur">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem name="re_password" label="重复密码" trigger="change">
      <TextInput v-model="form.re_password" type="password" placeholder="请重复输入密码" />
    </FormItem>
    <FormItem>
      <button class="btn btn-primary w-full" type="button" @click="handleRegister">注册用户</button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput, toast } from 'li-daisy'
import type { FormRef } from 'li-daisy'
import { ref } from 'vue'

const formRef = ref<FormRef>()

const form = ref({
  email: '',
  password: '',
  re_password: '',
})

const yup = useYup()

const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup
    .string()
    .required('请输入密码')
    .min(8, '密码不得少于八位')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      '密码必须包含大小写字母、数字和特殊字符',
    )
    .trim(),
  re_password: yup
    .string()
    .required('请再次输入密码')
    .oneOf([yup.ref('password')], '两次密码输入不一致'),
})

const handleRegister = async () => {
  formRef.value
    ?.validate()
    .then(() => {
      window.alert('注册成功')
    })
    .catch(() => {
      toast.warning('表单填写有误')
    })
}
</script>
