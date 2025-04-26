import * as yup from 'yup'
export const useYup = () => {
  yup.setLocale({
    mixed: {
      default: '${path} 无效',
      required: '${path} 为必填项',
      oneOf: '${path} 必须是以下值之一：${values}',
      notOneOf: '${path} 不能是以下值之一：${values}',
    },
    string: {
      length: '${path} 必须刚好是 ${length} 个字符',
      min: '${path} 至少 ${min} 个字符',
      max: '${path} 最多 ${max} 个字符',
      matches: '${path} 必须匹配以下格式: "${regex}"',
      email: '${path} 必须是有效的邮箱地址',
      url: '请输入有效的网址',
      trim: '${path} 不能包含首尾空格',
      lowercase: '${path} 只能包含小写字母',
      uppercase: '${path} 只能包含大写字母',
    },
    number: {
      min: '${path} 必须大于或等于 ${min}',
      max: '${path} 必须小于或等于 ${max}',
      lessThan: '${path} 必须小于 ${less}',
      moreThan: '${path} 必须大于 ${more}',
      positive: '${path} 必须是正数',
      negative: '${path} 必须是负数',
      integer: '${path} 必须是整数',
    },
    date: {
      min: '${path} 必须在 ${min} 之后',
      max: '${path} 必须在 ${max} 之前',
    },
    array: {
      min: '${path} 至少需要 ${min} 个项',
      max: '${path} 最多 ${max} 个项',
    },
  })
  return yup
}
