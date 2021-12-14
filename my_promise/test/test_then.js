const MyPromise = require("../promise");

new MyPromise((resolve, reject) => {
    resolve('如果成功了,就会看到我');
}).then(res => {
    console.log('then 测试成功', res);
}, err => {
    console.log('then 测试失败', err);
});