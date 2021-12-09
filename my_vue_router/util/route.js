/**
 * 解析传递过来的路由
 * @param {*} record 路由记录
 * @param {*} path 路由路径
 * @returns {*} {path, matched}
 */
export default function createRoute(record, path) {
    const matched = [];

    // 循环执行直至没有子路由
    while (record) {
        // 循环得到的 record 插入到数组前面
        matched.unshift(record);
        record = record.parent;
    }

    return {
        path,
        matched,
    }
}