// 父组件
<template>
    <div id="app">
        <users v-bind:users="myUsers"></users>
    </div>
</template>

<script>
import User from './user.vue';

export default {
    name: 'App',
    data() {
        return {
            myUsers: ['aa', 'vv', 'dd']
        }
    },

    components: {
        "users": User
    }
}
</script>
