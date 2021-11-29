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
            } else {
                this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
            }
        }
    })
}