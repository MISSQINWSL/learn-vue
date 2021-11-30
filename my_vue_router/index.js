import install from './install';
export default class VueRouter {
    constructor(options) {
        // 获取 router 路由匹配规则
        this._options = options.routes || [];
    }

    // 初始化
    init(Vue) {

    }
}

// 为 VueRouter 添加 install 方法
VueRouter.install = install;