// 定义全局 Vue
export let _Vue = null;

export default function install(Vue) {
    _Vue = Vue;
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this; // 保存 Vue
                this._router = this.$options.router; // 保存实例
                this._router.init(this); // 初始化
                // 创建一个代表当前路由响应式的值 _route，defineReactive 一参时绑定在谁身上，二参时值名称，三参时值
                Vue.util.defineReactive(this, '_route', this._router.history.current);
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
        }
    })
}