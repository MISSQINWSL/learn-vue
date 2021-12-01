import createRouteMap from './create-route-map';

/**
 * 解析路由规则
 * @param {*} router 路由规则
 * @returns {*} {}
 */
export default function createMatcher(router) {
    const { pathList, pathMap } = createRouteMap(router);

    // match 从 pathMap 中获取 path 对应的路由记录
    function match(path) {

    }

    // 添加动态路由
    function addRoutes(router) {
        createRouteMap(router, pathList, pathMap);
    }

    // 返回 match 和 addRoutes
    return {
        match,
        addRoutes,
    }
}