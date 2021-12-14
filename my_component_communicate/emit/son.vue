// 子组件
<template>
    <header>
        <h1 @click="changeTitle">{{title}}</h1>
    </header>
</template>

<script>
export default {
    name: 'appHeader',
    data() {
        return {
            title: 'init title'
        }
    },

    methods: {
        changeTitle() {
            this.$emit('changed', "验证子组件向父组件传值成功")
        }
    }
}
</script>