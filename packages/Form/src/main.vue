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

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: '60px',
  align: 'vertical',
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

const isValid = ref(false)

watch(
  errors,
  newErrors => {
    // newErrors 是当前所有字段的错误集合（可能为空对象）
    const hasErrors = Object.keys(newErrors || {}).length > 0
    isValid.value = !hasErrors
  },
  { deep: true, immediate: true }
)

// 初始化表单字段
onMounted(() => {
  for (const fieldName in props.form) {
    if (Object.prototype.hasOwnProperty.call(props.form, fieldName)) {
      setFieldValue(fieldName, props.form[fieldName])
    }
  }
})

watch(
  () => props.form,
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
  isValid,
}

defineExpose(exposeObject)
</script>
