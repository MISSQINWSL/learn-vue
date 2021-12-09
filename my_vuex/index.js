// 保存全局的 Vue
let _Vue = null;

// Store 类
class Store {
    constructor(options) {
        // 给 state mutations actions getters 赋初值
        const state = options.state || {};
        const mutations = options.mutations || {};
        const actions = options.actions || {};
        const getters = options.getters || {};
    }
}

// install 方法负责将 Vuex 可以被 Vue.use() 安装
function install(Vue) {
    // 将传入的 Vue 保存到全局 _Vue
    _Vue = Vue;
    // 混入全局注册，这样所有的组件就都可以使用 $store
    _Vue.mixin({
        // 在 beforeCreate 这个初始化阶段把 $store 挂载在 Vue 上
        beforeCreate() {
            // this.$options 是 new Vue() 传递的对象，判断它上面是否有 store 需要挂载
            if (this.$options.store) {
                // 把 store 挂载到 Vue 原型上
                _Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

// 导出 install 和 Store
export default {
    install,
    Store,
}