// 父组件
<template>
    <son-demo ref="sonA"></son-demo>
</template>

<script>
const sonDemo = () => import('./son.vue');

export default {
    components: {
        sonDemo
    },
    mounted() {
        const sonA = this.$refs.sonA;
        console.log(sonA.title); // Vue.js
        sonA.hello(); // 启动了 alert
    }
}
</script>