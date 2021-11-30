/**
 * 解析传递过来的路由
 * @param {*} routes 路由规则
 * @param {*} oldPathList 路由列表
 * @param {*} oldPathMap 路由和组件的对应关系
 */
export default function createRouteMap(routes, oldPathList, oldPathMap) {
    const pathList = oldPathList || [];
    const pathMap = oldPathMap || [];

    routes.forEach(route => {
        // 解析遍历到的路由
        addRouteRecord(route, pathList, pathMap);
    })

    // 返回解析后的路由列表和映射关系
    return {
        pathList,
        pathMap
    }
};

/**
 * 处理路由映射
 * @param {*} routes 路由规则
 * @param {*} pathList 路由列表
 * @param {*} pathMap 路由和组件的对应关系
 * @param {*} parentRecord 父路由
 */
function addRouteRecord(route, pathList, pathMap, parentRecord) {
    // 判断是否有父路由，如果有就拼接父路由和当前路由
    const path = parentRecord ? `${parentRecord.path}/${route.path}` : route.path;
    const record = {
        path,
        component: route.component,
        parent: parentRecord
    };

    // 判断路由列表是否存在当前路由，如果不存在就添加
    if (!pathList[path]) {
        pathList.push(path);
        pathMap[path] = record;
    }

    // 如果有子路由，递归添加
    if (route.children) {
        route.children.forEach(childRoute => {
            addRouteRecord(childRoute, pathList, pathMap, record);
        })
    }
}