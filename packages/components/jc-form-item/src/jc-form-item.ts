import { ExtractPropTypes, PropType } from 'vue'

export const formItemInputTypes = ['input', 'textarea', 'password'] as const
export type FormItemInputTypes = (typeof formItemInputTypes)[number]

export const formItemDateTimeTypes = [
    'date',
    'datetime',
    'time',
    'datetimerange',
    'daterange'
] as const
export type FormItemDateTimeTypes = (typeof formItemDateTimeTypes)[number]

export const formItemSelectTypes = ['select', 'radio', 'checkbox'] as const
export type FormItemSelectTypes = (typeof formItemSelectTypes)[number]

export type FormItemTypes =
    | FormItemInputTypes
    | FormItemDateTimeTypes
    | FormItemSelectTypes

export const jcFormItemProps = {
    /**
     * @description: 表单域值
     */
    modelValue: {
        type: [String, Number, Array, Object]
    },

    /**
     * @description: 标签文本
     */
    label: {
        type: String
    },

    labelWidth: {
        type: [String, Number],
        default: 'auto'
    },

    /**
     * @description: 校验规则
     */
    rules: {
        type: [Object, Array],
        required: false
    },

    /**
     * @description: 表单项类型
     */
    type: {
        type: String as PropType<FormItemTypes>,
        default: 'input'
    }
}

export type JcFormItemProps = ExtractPropTypes<typeof jcFormItemProps>

export const jcFormItemEmits = {
    input: (value: any) => true,
    enter: () => true
}
export type JcFormItemEmits = typeof jcFormItemEmits
