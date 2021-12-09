import History from './base';

export default class HashHistory extends History {
    constructor(router) {
        super(router);
        ensureSlash(); // 第一次访问时路由加上 #
    }

    // 监听
    setUpListener() {
        window.addEventListener('hashchange', () => {
            this.transitionTo(this.getCurrentLocation());
        })
    }

    // 获取去除 # 号后的 URL hash
    getCurrentLocation() {
        let href = window.location.href;
        const index = href.indexOf('#');

        if (index < 0) {
            return '';
        }

        href = href.slice(index + 1);
        return href;
    }

    ensureSlash() {
        // 如果存在 hash 就不用加 # 了
        if (window.location.hash) {
            return ;
        }
        // 如果不存在 hash 只有给 hash 加上 / ，会可以自动加上 /#/
        window.location.hash = '/';
    }
}