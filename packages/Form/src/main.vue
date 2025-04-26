<template>
  <div>
    <VeeForm>
      <slot />
    </VeeForm>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Form as VeeForm } from 'vee-validate'
import { onMounted, provide, readonly, watch } from 'vue'
import type { FormProps, FormRef } from './types'

const model = defineModel<Record<string, unknown>>({})

const props = withDefaults(defineProps<FormProps>(), {
  labelWidth: '60px',
  align: 'horizontal',
})

provide('labelWidth', props.labelWidth)
provide('align', props.align)

const {
  errors,
  meta,
  defineField,
  setFieldValue,
  validate: veeValidate,
  validateField: veeValidateField,
} = useForm({
  validationSchema: props.schema,
})

// 初始化表单字段
onMounted(() => {
  if (model.value) {
    for (const fieldName in model.value) {
      if (Object.prototype.hasOwnProperty.call(model.value, fieldName)) {
        setFieldValue(fieldName, model.value[fieldName])
      }
    }
  }
})

watch(
  model,
  (newValue) => {
    if (newValue) {
      for (const fieldName in newValue) {
        // 确保只设置 model 中存在的属性
        if (Object.prototype.hasOwnProperty.call(newValue, fieldName)) {
          setFieldValue(fieldName, newValue[fieldName])
        }
      }
    }
  },
  { deep: true },
)

provide('errors', readonly(errors))

// 包装 validate 函数
const validate = (): boolean => {
  return meta.value.valid
}

// const validatePromise = async (): Promise<boolean> => {
//   const result = await veeValidate()
//   return result.valid
// }

// 包装 validateField 函数
const validateField = async (fieldName: string): Promise<void> => {
  await veeValidateField(fieldName)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

// const validateFieldPromise = async (fieldName: string): Promise<void> => {
//   await veeValidateField(fieldName) // 调用 vee-validate 的 validateField，忽略返回值
//   // 不需要显式 return undefined，async 函数默认返回 Promise<void>
// }

const exposeObject: FormRef = {
  validate,
  // validatePromise,
  validateField,
  // validateFieldPromise,
}

defineExpose(exposeObject)
</script>
