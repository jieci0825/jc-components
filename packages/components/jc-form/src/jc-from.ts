import type { FormItemTypes } from '../../jc-form-item'
import type { ExtractPropTypes, PropType } from 'vue'

export interface FormItemConfig {
    label: string // 标签文本
    prop: string // 表单字段
    type: FormItemTypes // 表单类型
    placeholder?: string // 占位符
    span?: number // 占用宽度
    slotName?: string // 插槽名称
    defaultValue?: any // 默认值
    numberValue?: boolean // 数字类型的值
}

// props
export const jcFormProps = {
    /**
     * @description: 表单数据
     */
    model: {
        type: Object,
        default: () => ({})
    },

    /**
     * @description: 标签的宽度
     */
    labelWidth: {
        type: [String, Number],
        default: '100px'
    },

    /**
     * @description: 规则
     */
    rules: {
        type: Object
    },

    /**
     * @description: 是否显示必填项的星号
     */
    showRequired: {
        type: Boolean,
        default: true
    },

    /**
     * @description: 表单项
     */
    formItems: {
        type: Array as PropType<FormItemConfig[]>,
        default: () => []
    },

    /**
     * @description: jc-form 的外边距，单位 px
     */
    top: {
        type: Number,
        default: 0
    },
    right: {
        type: Number,
        default: 0
    },
    bottom: {
        type: Number,
        default: 0
    },
    left: {
        type: Number,
        default: 0
    },
    /**
     * @description: 每个 formItem 占用的宽度，1-24; 此为全局的，如果没有单独给 formItem 设置，则会默认继承这个配置
     */
    span: {
        type: Number,
        default: 24,
        validator(value: number) {
            return value >= 1 && value <= 24
        }
    },

    /**
     * @description: 每个 formItem 之间的间距，单位 px
     */
    gutter: {
        type: Number,
        default: 0
    },

    /**
     * @description: 表单只读
     */
    readonly: {
        type: Boolean,
        default: false
    },

    /**
     * todo
     * @description: 只读状态时，是否以描述的形式展示
     */
    showDesc: {
        type: Boolean,
        default: false
    }
}

export type JcFormProps = Partial<ExtractPropTypes<typeof jcFormProps>>

export const jcFormEmits = {
    'update:modelValue': (val: any) => true,
    submit: (val: any) => true
}
export type JcFormEmits = typeof jcFormEmits
