import install from './install';
import createMatcher from './create-matcher';
export default class VueRouter {
    constructor(options) {
        // 获取 router 路由匹配规则
        this._routes = options.routes || [];
        // 解析路由传入规则
        this.matcher = createMatcher(this._routes);
    }

    // 初始化
    init(Vue) {

    }
}

// 为 VueRouter 添加 install 方法
VueRouter.install = install;