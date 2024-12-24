<script setup lang="ts">
import { JcFormItem } from '@jc-components/components'
import { createNamespace } from '@jc-components/utils'
import { ElForm, ElRow, ElCol } from 'element-plus'
import { jcFormProps } from './jc-from'
import { computed, ref, useAttrs } from 'vue'
import { extend } from '@vue/shared'

defineOptions({ name: 'JcForm' })

const bem = createNamespace('form')
const $attrs = useAttrs()
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
        <slot name="prepend"></slot>
        <el-row :gutter="gutter" justify="space-between">
            <el-form
                v-bind="$attrs"
                @submit.native.prevent
                :model="props.model"
                :style="marginStyle"
                :rules="props.rules"
                :label-width="props.labelWidth"
                ref="elFormRef"
            >
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
            </el-form>
        </el-row>
    </div>
</template>

<style lang="scss"></style>
