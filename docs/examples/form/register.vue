<template>
  <Form ref="formRef" :form="form" :schema="schema" align="vertical">
    <FormItem name="email" label="邮箱">
      <TextInput v-model="form.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem name="password" label="密码">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem name="re_password" label="重复密码">
      <TextInput v-model="form.re_password" type="password" placeholder="请重复输入密码" />
    </FormItem>
    <FormItem>
      <button class="li-btn w-full" @click="handleRegister">注册用户</button>
    </FormItem>
  </Form>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput, Notification, Message } from 'li-daisy'

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
      '密码必须包含大小写字母、数字和特殊字符'
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
      Message.info('注册成功')
    })
    .catch(() => {
      Notification.warning({
        title: '表单验证失败',
        message: '表单填写有误',
      })
    })
}
</script>
