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

    // 构造函数
    constructor(options) {
        this.options = options; // routes
        this.routerMap = {}; // 保存路由和组件的映射
        this.data = _vue.observable({
            // 当前路由的地址
            current: '/',
        })
    }

    // 解析路由规则
    createRouterMap() {
        this.options.routes.forEach(item => {
            // 遍历 routes 添加到 routerMap
            this.routerMap[item.path] = item.component;
        })
    }

    initComponents(Vue) {
        // 实现 router-link
        Vue.component('router-link', {
            props: {
                to: String, // 将访问的地址
            },

            // 因为使用的是运行版的 Vue，无法渲染 template，所以额外写个 render
            // 比如要渲染的 template 是这个: <a :href="to"><slot></slot></a>
            render(h) {
                // h函数的一参是标签，二参是标签里的属性对象
                return h(
                    'a',
                    {
                        attrs: {
                            href: this.to
                        },
                        on: {
                            // 重写点击函数，阻止点击时向服务器发送请求
                            click: this.myClick
                        },
                    },
                    // 渲染默认插槽
                    [this.$slots.default]
                )
            },

            methods: {
                myClick(e) {
                    // 模拟 histroy 的路由形式采用 pushState，如果模拟 hash 路由可采用 push
                    // 使用 histroy 修改浏览器上的地址
                    // pushState 一参是传递的参数，二参是页面标题，三参是页面标题
                    history.pushState({}, '', this.to);
                    // router-view 是根据 current 来渲染的，所以要做成响应式
                    this.$router.data.current = this.to;
                    // 阻止默认的跳转事件
                    e.preventDefault();
                }
            }
        });

        // 实现 router-view
        Vue.component('router-view', {
            return(h) {
                // 获取当前路径对应的组件
                const component = this.$router.routerMap[this.$router.data.current];
                // 转化为虚拟 DOM
                return h(component);
            }
        })
    }
}