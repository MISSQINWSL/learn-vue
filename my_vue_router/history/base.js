import createRoute from '../util/route';

export default class History {
    // router 是 Vue router 路由对象的一个实例
    constructor(router) {
        this.router = router; // 赋值传过来的 router 初始化
        // 默认当前的路径为 /
        this.current = createRoute(null, '/');
        // cb 作为回调函数的作用是修改响应式路由的 _route 值，刷新对应的视图
        this.cb = null;
    }

    // listen 监听修改 cb 的值
    listen(cb) {
        this.cb = cb;
    }

    // 跳转到的地址
    transitionTo(path, onComplete) {
        // 调用 Vue-router 里的 this.matcher 的 match 方法
        this.current = this.router.matcher.match(path);
        // 如果 cb 存在的话就修改响应式路由的值
        this.cb && this.cb(this.current);
        // 触发回调
        onComplete && onComplete();
    }
}