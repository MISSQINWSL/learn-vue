const MyPromise = require("../promise");

const test1 = new MyPromise((resolve, reject) => {
    throw('失败了');
})

console.log(test1);