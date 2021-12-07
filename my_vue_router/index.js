import install from './install';
import createMatcher from './create-matcher';
import HashHistory from './history/hash';
import HTML5History from './history/html5';

export default class VueRouter {
    constructor(options) {
        // 获取 router 路由匹配规则
        this._routes = options.routes || [];
        // 解析路由传入规则
        this.matcher = createMatcher(this._routes);
        // 设置模式，默认为 hash 模式
        this.mode = options.mode || 'hash';
        // 根据不同的模式执行不同的路由跳转功能
        switch(this.mode) {
            case 'history':
                this.history = new HTML5History(this);
                break;
            case 'hash':
                this.history = new HashHistory(this);
                break;
            default:
                throw new Error('该模式不存在');
        }
    }

    // 初始化
    init(Vue) {
        // 拿到模式的实例
        const history = this.history;
        // 一参是 path 二参是回调函数
        history.transitionTo(history.getCurrentLocation, () => {
            // 监听 URL 的变化，设置当前的 current
            history.setUpListener();            
        });
        // 修改响应式的 route
        history.listen(route => {
            Vue._route = route;
        })
    }
}

// 为 VueRouter 添加 install 方法
VueRouter.install = install;