<template>
  <Form ref="formRef" :form="form" :schema="schema" align="vertical">
    <FormItem name="email" label="邮箱">
      <TextInput v-model="form.email" placeholder="请输入邮箱" />
    </FormItem>
    <FormItem name="password" label="密码">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <div class="space-y-3">
        <button class="btn w-full" @click="handleValidateEmail">验证邮箱</button>
        <button class="btn w-full" @click="handleValidatePassword">验证密码</button>
      </div>
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
})

const yup = useYup()

const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').min(6).trim(),
})

const handleValidateEmail = () => {
  formRef.value
    ?.validateField('email')
    .then(() => {
      Message.info('注册成功')
    })
    .catch(err => {
      Notification.warning({
        title: '验证失败',
        message: err,
      })
    })
}

const handleValidatePassword = () => {
  formRef.value
    ?.validateField('password')
    .then(() => {
      Message.info('注册成功')
    })
    .catch(err => {
      Notification.warning({
        title: '验证失败',
        message: err,
      })
    })
}
</script>
