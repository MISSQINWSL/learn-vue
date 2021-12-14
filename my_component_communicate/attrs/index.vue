// index.vue
<template>
  <div>
      <h2>Demo</h2>
      <child-com1
        :foo="foo"
        :boo="boo"
        :coo="coo"
        :doo="doo"
        title="示例"
      ></child-com1>
  </div>
</template>

<script>
const childCom1 = () => import("./childCom1.vue");

export default {
    components: {
        childCom1
    },

    data() {
        return {
            foo: "JavaScript",
            boo: "Html",
            coo: "CSS",
            doo: "Vue"
        }
    }
}
</script>