<script setup lang="ts">
import { JcForm, type JcFormProps } from '@jc-components/components'
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'

const formData = reactive({
    name: '',
    password: '',
    description: ''
})
type FormData = typeof formData

const rules = reactive<FormRules<FormData>>({
    name: [{ trigger: 'blur', message: '请输入用户名', required: true }],
    password: [{ trigger: 'blur', message: '请输入密码', required: true }]
})

const formConfig: JcFormProps = {
    model: formData,
    formItems: [
        {
            label: '用户名',
            prop: 'name',
            type: 'input',
            placeholder: '请输入用户名'
        },
        {
            label: '密码',
            prop: 'password',
            type: 'password',
            placeholder: '请输入密码',
            showPassword: true
        },
        // todo age
        {
            label: '个人简介',
            prop: 'description',
            type: 'textarea',
            placeholder: '请输入个人简介'
        }
    ],
    rules
}

// window.getData = () => {
//     console.log(formData)
// }
</script>

<template>
    <div class="container">
        <jc-form v-bind="formConfig"></jc-form>
    </div>
</template>

<style scoped lang="scss"></style>
