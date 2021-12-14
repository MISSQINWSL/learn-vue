// childCom3.vue
<template>
    <div>
        <p>childCom3: {{ $attrs }}</p>
    </div>
</template>

<script>
export default {
    props: {
        coo: String,
        title: String
    },
    created() {
        console.log(this.$attrs); // { "doo": "Vue" }
    }
}
</script>