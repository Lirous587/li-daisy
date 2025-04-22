<template>
  <VeeForm>
    <slot />
  </VeeForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import type { BaseFieldProps, GenericObject } from 'vee-validate'
import { provide, reactive, watch, type Ref } from 'vue'
import type { FormRef } from './types'

// 完善类型定义
interface FormProps {
  schema: GenericObject
  labelWidth?: string
}

const model = defineModel<Record<string, unknown>>()

const props = defineProps<FormProps>()

provide('labelWidth', props.labelWidth)

// 使用vee-validate初始化表单
const {
  defineField,
  errors,
  handleSubmit,
  setFieldValue,
  meta,
  validateField: validateFormField,
} = useForm({
  validationSchema: props.schema,
})

type FieldValues = Record<string, any>
type FieldAttrs = Record<string, Ref<BaseFieldProps & GenericObject>>

const fields = reactive<FieldValues>({})
const attrs = reactive<FieldAttrs>({})

// 初始化表单字段
if (model.value) {
  for (const fieldName in model.value) {
    const [value, meta] = defineField(fieldName)
    fields[fieldName] = value
    attrs[fieldName] = meta
  }
}

// 向子组件提供errors
provide('errors', errors)

watch(
  model,
  (newValue) => {
    for (const fieldName in newValue) {
      setFieldValue(fieldName, newValue[fieldName])
      // fields[fieldName] = newValue[fieldName];
    }
  },
  { deep: true },
)

// 验证整个表单
const validate = () => meta.value.valid

// 验证指定字段
const validateField = async (fieldName: string) => {
  if (fieldName in fields) {
    await validateFormField(fieldName).then((result) => {
      return result.value
    })
  }
}

const exposeObject: FormRef = {
  isValidate: validate,
  validateField,
}

defineExpose(exposeObject)
</script>
