import Vue from 'vue';
import Vuex from '../../../my_vuex/index';
// 把自定义的 Vuex 安装到 Vue 上
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'sarah',
        love: 'smile',
    },

    mutations: {
        changeName(state, newName) {
            // 修改名字
            state.name = newName;
        },
    },

    actions: {
        changeNameAsync(context, newName) {
            // 用 setTimeout 模拟异步
            setTimeout(() => {
                context.commit('changeName', newName);
            }, 1000);
        },
    },

    getters: {
        decorationName(state) {
            return `自我介绍下 我叫${state.name} 我喜欢${state.love}`
        },
    },
})