<template>
  <Form v-model="form" ref="formRef" :schema="schema" align="vertical">
    <FormItem name="email" label="用户名" trigger="input">
      <TextInput v-model="form.email" placeholder="请输入用户名" />
    </FormItem>
    <FormItem name="password" label="密码" trigger="blur">
      <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
    </FormItem>
    <FormItem>
      <button class="btn btn-primary w-full" type="button" @click="handleValidateEmail">
        验证邮箱
      </button>
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
})

const yup = useYup()

const schema = yup.object({
  email: yup.string().email().required('请输入邮箱').trim(),
  password: yup.string().required('请输入密码').trim(),
})

const handleValidateEmail = async () => {
  formRef.value
    ?.validateField('email')
    .then((res) => {
      window.alert('验证成功')
    })
    .catch((err) => {
      toast.warning(err)
    })
}
</script>
