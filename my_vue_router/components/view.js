export default {
    render(h) {
        // 获取路由规则对象
        const route = this.$route;
        // 定义一个变量用于取 matcher 的值
        let depth = 0;
        this.routerView = true;
        let parent = this.$parent;
        // 判断是否有父组件
        while(parent) {
            // 判断该组件是否为 routerView
            if (parent.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }

        // matched 里面是多个路由对象，以这种模式保存 [parentRecord, childRecord]，比如['/login','/login/to']
        // 通过变量 depth 取出后面的 childRecord
        const record = route.matched[depth];
        // 没有 record 就直接渲染
        if (!record) {
            return h();
        }

        const component = record.component;
        return h(component);
    }
}