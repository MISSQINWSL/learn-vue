// childCom1.vue
<template>
    <div>
        <p>foo:{{ foo }}</p>
        <p>childCom1 的 $attrs: {{ $attrs }}</p>
        <child-com2 v-bind="$attrs"></child-com2>
    </div>
</template>

<script>
import childCom2 from './childCom2.vue';
const childCom2 = () => import("./childCom2.vue");

export default {
  components: { childCom2 },
    component: {
        childCom2
    },

    inheritAttrs: false, // 关闭自动挂载到组件根元素上的没在 props 上声明的属性
    props: {
        foo: String // foo 作为根元素绑定
    },
    
    created() {
        console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", title: "示例" }
    }
}
</script>