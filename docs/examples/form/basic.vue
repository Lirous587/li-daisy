<template>
  <div>
    <div>
      <input type="password" class="input" />
    </div>
    <div>
      <Form label-width="60px" v-model="form" :schema="schema">
        <FormItem name="name" label="用户名">
          <TextInput v-model="form.name" placeholder="请输入用户名" />
        </FormItem>
        <FormItem name="password" label="密码">
          <TextInput v-model="form.password" type="password" placeholder="请输入密码" />
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Form, FormItem, useYup, TextInput } from 'li-daisy'
import { reactive } from 'vue'

const form = reactive({
  name: '',
  password: '',
})

const yup = useYup()
const schema = yup.object({
  name: yup.string().required('请输入用户名').trim(),
  password: yup.string().required('请输入密码').trim(),
})
</script>
