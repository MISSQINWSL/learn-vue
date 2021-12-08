import View from './components/view';
import Link from './components/link';

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

    // 添加 $router 路由实例
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            // this._routerRoot 即 Vue，它的 _router 是 Vue Router 实例
            return this._routerRoot._router;
        },
    })

    // 添加 $route 路由规则对象
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route;
        }
    })

    // 注册 Link 和 View
    Vue.component('RouterView', View);
    Vue.component('RouterLink', Link);
}