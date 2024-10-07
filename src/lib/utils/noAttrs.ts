import { defineOptions } from 'vue'

type DefineOptionsOption = Parameters<typeof defineOptions>[0]

export default function noAttrs <Option extends string | DefineOptionsOption> (option: Option): DefineOptionsOption {
  return typeof option === 'string'
    ? {
      name: option,
      inheritAttrs: false
    } : {
      ...option,
      inheritAttrs: false
    }
}
