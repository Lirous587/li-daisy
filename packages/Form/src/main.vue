<template>
  <VeeForm>
    <slot />
  </VeeForm>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Form as VeeForm } from 'vee-validate'
import { onMounted, provide, readonly, ref, watch } from 'vue'
import type { FormProps, FormRef } from './types'

// @typescript-eslint/no-explicit-any
const model = defineModel<Record<string, any>>()

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: '60px',
  align: 'horizontal',
})

provide('labelWidth', props.labelWidth)
provide('align', props.align)

const {
  errors,
  setFieldValue,
  validate: veeValidate,
  validateField: veeValidateField,
} = useForm({
  validationSchema: props.schema,
})

// 初始化表单字段
onMounted(() => {
  for (const fieldName in model.value) {
    if (Object.prototype.hasOwnProperty.call(model.value, fieldName)) {
      setFieldValue(fieldName, model.value[fieldName])
    }
  }
})

watch(
  () => model.value,
  newValue => {
    if (newValue) {
      for (const fieldName in newValue) {
        // 确保只设置 model 中存在的属性
        if (Object.prototype.hasOwnProperty.call(newValue, fieldName)) {
          setFieldValue(fieldName, newValue[fieldName])
        }
      }
    }
  },
  { deep: true }
)

provide('errors', readonly(errors))

const isExecuteErrorAnimation = ref(false)

// 包装 validate 函数
const validate = async (): Promise<void> => {
  isExecuteErrorAnimation.value = true
  const result = await veeValidate()
  if (result.valid) {
    return
  } else {
    throw new Error('validate failed')
  }
}

// 包装 validateField 函数
const validateField = async (fieldName: string): Promise<void> => {
  const result = await veeValidateField(fieldName)
  if (result.valid) {
    return
  } else {
    throw result.errors[0]
  }
}

provide('isExecuteErrorAnimation', readonly(isExecuteErrorAnimation))

const exposeObject: FormRef = {
  validate,
  validateField,
}

defineExpose(exposeObject)
</script>
