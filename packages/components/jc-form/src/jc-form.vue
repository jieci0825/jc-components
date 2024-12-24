<script setup lang="ts">
import { JcFormItem } from '@jc-components/components'
import { createNamespace } from '@jc-components/utils'
import { ElForm, ElRow, ElCol, ElButton } from 'element-plus'
import { jcFormProps } from './jc-from'
import { computed, ref, useAttrs, useSlots } from 'vue'
import { extend } from '@vue/shared'

defineOptions({ name: 'JcForm' })

const $attrs = useAttrs()
const $slots = useSlots()
const bem = createNamespace('form')
const props = defineProps(jcFormProps)

const elFormRef = ref<InstanceType<typeof ElForm>>()

const marginStyle = computed(() => {
    return {
        marginTop: props.top + 'px',
        marginRight: props.right + 'px',
        marginBottom: props.bottom + 'px',
        marginLeft: props.left + 'px'
    }
})
const innerItems = computed(() => {
    return props.formItems.map(item => {
        return extend(
            {
                span: props.span
            },
            item
        )
    })
})
</script>

<template>
    <div :class="bem.b()">
        <!-- jc-form 头部插入 -->
        <slot name="prepend"></slot>

        <!-- jc-form main -->
        <el-form
            v-bind="$attrs"
            @submit.native.prevent
            :model="props.model"
            :style="marginStyle"
            :rules="props.rules"
            :label-width="props.labelWidth"
            ref="elFormRef"
        >
            <el-row :gutter="gutter" justify="space-between">
                <template v-for="(item, idx) in innerItems" :key="idx">
                    <el-col :span="item.span">
                        <!-- 数字类型的值 -->
                        <jc-form-item
                            v-if="item.numberValue"
                            v-model.number="model[item.prop]"
                            v-bind="item"
                            :ref="item.prop"
                        ></jc-form-item>
                        <jc-form-item
                            v-else
                            v-model="model[item.prop]"
                            v-bind="item"
                            :ref="item.prop"
                        ></jc-form-item>
                    </el-col>
                </template>
                <!-- 表单页脚 -->
                <el-col :span="24" v-if="$slots.footer || props.showFooter">
                    <!-- 默认页脚 -->
                    <slot name="footer">
                        <div :class="bem.e('footer')">
                            <el-button>重置</el-button>
                            <el-button type="primary">确认</el-button>
                        </div>
                    </slot>
                </el-col>
            </el-row>
        </el-form>

        <!-- jc-form 底部追加 -->
        <slot name="append"></slot>
    </div>
</template>
