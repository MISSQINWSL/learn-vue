import createRoute from '../util/route';

export default class History {
    // router 是 Vue router 路由对象的一个实例
    constructor(router) {
        this.router = router; // 赋值传过来的 router 初始化
        // 默认当前的路径为 /
        this.current = createRoute(null, '/');
    }

    // 跳转到的地址
    transitionTo(path, onComplete) {
        // 调用 Vue-router 里的 this.matcher 的 match 方法
        this.current = this.router.matcher.match(path);
        // 触发回调
        onComplete && onComplete();
    }
}