const MyPromise = require("../promise");

new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('定时器到了, 成功');
    }, 1000);
}).then(res => console.log('回调成功', res), err  => console.log('回调失败', err))