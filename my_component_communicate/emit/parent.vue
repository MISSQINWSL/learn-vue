// 父组件
<template>
    <div id="app">
        <app-header @changed="updateTitle"></app-header>
        <h2>{{title}}</h2>
    </div>
</template>

<script>
import appHeader from './son.vue';

export default {
    name: "App",
    data() {
        return {
            title: "点点看"
        }
    },

    methods: {
        updateTitle(e) {
            this.title = e;
        }
    },

    components: {
        "app-header": appHeader
    }
}
</script>