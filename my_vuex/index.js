// 保存全局的 Vue
let _Vue = null;

// Store 类
class Store {
    constructor(options) {
        // 给 state mutations actions getters 赋初值
        const state = options.state || {};
        const mutations = options.mutations || {};
        const actions = options.actions || {};
        const getters = options.getters || {};

        // 实现state：用 Vue 中的 observable 把 state 中的数据转为响应式
        this.state = _Vue.observable(state);
        // 实现getters：为 getters 里的每一个方法都添加一个 get

        this.getters = Object.create(null);
        // 使用数据劫持为 getters 添加 get 方法
        Object.keys(getters).forEach(key => {
            Object.defineProperty(this.getters, key, {
                // 为 this.getters 每一项都添加一个 get 方法
                get: () => {
                    // 改变 getters 中的 this 指向
                    return getters[key].call(this, this.state);
                }
            })
        });

        // 遍历 mutations 中的对象改变 this 指向
        this.mutations = {};
        Object.keys(mutations).forEach(key => {
            this.mutations[key] = params => {
                // 改变 mutations 中的 this 指向，默认传入 state
                mutations[key].call(this, this.state, params);
            }
        });

        // 遍历 actions 中的对象改变 this 指向
        this.actions = {};
        Object.keys(actions).forEach(key => {
            this.actions[key] = params => {
                // 改变 actions 中的 this 指向，默认传入 store 即 this
                actions[key].call(this, this, params);
            }
        })
    }

    // commit 用于触发 mutations 中的方法，一参是事件名，二参是传入的参数
    commit = (eventName, params) => {
        this.mutations[eventName](params);
    }

    // dispatch 用于触发 actions 中的异步方法，一参是事件名，二参是传入的参数
    dispatch = (eventName, params) => {
        this.actions[eventName](params);
    }
}

// install 方法负责将 Vuex 可以被 Vue.use() 安装
function install(Vue) {
    // 将传入的 Vue 保存到全局 _Vue
    _Vue = Vue;
    // 混入全局注册，这样所有的组件就都可以使用 $store
    _Vue.mixin({
        // 在 beforeCreate 这个初始化阶段把 $store 挂载在 Vue 上
        beforeCreate() {
            // this.$options 是 new Vue() 传递的对象，判断它上面是否有 store 需要挂载
            if (this.$options.store) {
                // 把 store 挂载到 Vue 原型上
                _Vue.prototype.$store = this.$options.store;
            }
        }
    })
}

const mapState = params => {
    if(!Array.isArray(params)) {
        throw new Error('简略版只想处理数组参数');
    }

    const obj = {};
    // 在 this.$store 中寻找传递过来的参数
    params.forEach(item => {
        obj[item] = function() {
            return this.$store.state[item];
        };
    });

    return obj;
}

const mapMutations = params => {
    if (!Array.isArray(params)) {
        throw new Error('简略版只想处理数组参数');
    }

    const obj = {};
    // 在 this.$store 中寻找传递过来的参数
    params.forEach(item => {
        obj[item] = function(params) {
            return this.$store.commit(item, params);
        }
    })

    return obj;
}

const mapActions = params => {
    if (!Array.isArray(params)) {
        throw new Error('简略版只想处理数组参数');
    }

    const obj = {};
    // 在 this.$store 中寻找传递过来的参数
    params.forEach(item => {
        obj[item] = function(params) {
            return this.$store.dispatch(item, params);
        }
    })

    return obj;
}

const mapGetters = params => {
    if (!Array.isArray(params)) {
        throw new Error('简略版只想处理数组参数');
    }

    const obj = {};
    // 在 this.$store 中寻找传递过来的参数
    params.forEach(item => {
        obj[item] = function(params) {
            return this.$store.getters(item);
        }
    })

    return obj;
}

// 导出 install 和 Store
export default {
    install,
    Store,
}
export { mapState, mapMutations, mapActions, mapGetters };