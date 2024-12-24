<script setup lang="ts">
import { createNamespace } from '@jc-components/utils'
import { ElFormItem, ElInput, ElRadio, ElCheckbox } from 'element-plus'
import { computed, useAttrs } from 'vue'
import {
    FormItemInputTypes,
    formItemInputTypes,
    jcFormItemEmits,
    jcFormItemProps,
    type FormItemTypes
} from './jc-form-item'
import { extend } from '@vue/shared'

defineOptions({
    name: 'JcFormItem'
})

type DefaultProps = {
    [k in FormItemTypes]: any
}
const defaultProps: DefaultProps = {
    input: {},
    password: {},
    textarea: {
        resize: 'none'
    },
    select: {},
    radio: {},
    checkbox: {},
    date: {},
    time: {},
    datetime: {},
    daterange: {},
    datetimerange: {}
}

const bem = createNamespace('form-item')
const $attrs = useAttrs()
const props = defineProps(jcFormItemProps)
const emits = defineEmits(jcFormItemEmits)

const innerProps = computed(() => {
    // 先取出默认的配置
    const _defaultProps = defaultProps[props.type]
    // 组合 props
    const assembleProps = extend(
        _defaultProps,
        { clearable: true },
        props,
        // 外部使用了 v-model $attrs 上会被自动绑定 onUpdate:modelValue(即update:modelValue) 方法，进行更新表单项值
        $attrs
    )
    return assembleProps
})
const isInput = computed(() => {
    return formItemInputTypes.includes(props.type as FormItemInputTypes)
})
</script>

<template>
    <el-form-item :class="bem.b()">
        <!-- label -->
        <template v-slot:label>
            <slot name="label">
                <!-- 没有传递则使用默认结构 -->
                <!-- todo: 实现tip -->
                <span>{{ props.label }}</span>
            </slot>
        </template>
        <!-- item -->
        <!-- todo: 描述组件 -->
        <el-input
            v-if="isInput"
            v-bind="innerProps"
            @keyup.enter.native="emits('enter')"
            :type="props.type"
            :value="props.modelValue"
            :class="bem.e('inner')"
        ></el-input>
    </el-form-item>
</template>

<style lang="scss"></style>
