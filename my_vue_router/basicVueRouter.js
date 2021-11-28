// 保存一个全局变量 Vue
let _Vue = null;

// 自己实现的 VueRouter
export default class MyVueRouter {
    //  vue 提供 install 可供我们开发新的插件以及全局注册组件
    static install(Vue) {
        if (MyVueRouter.install.installed) {
            // 如果已经注册过，就直接返回
            return ;
        }

        MyVueRouter.install.installed = true;
        _Vue = Vue;

        // 使用混入来获取 Vue 中的this
        _Vue.mixin({
            beforeCreate() {
                // 通过判断有无挂载 router 来观察是实例创建还是组件创建
                if (this.$options.router) {
                    // 把 router 注册到 _Vue 上
                    _Vue.prototype.$router = this.$options.router;
                }
            }
        })
    }
}