// 子组件
<template>
    <div>
        <ul>
            <li v-for="(user, index) in users" :key="index">{{user}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'User',
    // 父组件通过 props 向子组件传值
    props: {
        users: {
            type: Array,
            required: true
        }
    }
}
</script>