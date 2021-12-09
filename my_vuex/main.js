import Vue from 'vue';
import App from './src/template';
import store from './src/store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');