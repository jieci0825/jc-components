<script setup lang="ts">
import { JcForm, type JcFormProps } from '@jc-components/components'
import { reactive } from 'vue'

const formData = reactive({
    keyword: ''
})

const formConfig: JcFormProps = {
    model: formData,
    formItems: [
        {
            label: '关键词',
            prop: 'keyword',
            type: 'input',
            placeholder: '请输入关键词',
            numberValue: true
        }
    ]
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
