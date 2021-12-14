const MyPromise = require("../promise");

const test1 = new MyPromise((resolve, reject) => {
    resolve('成功');
    reject('失败');
})

console.log(test1);