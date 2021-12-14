const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
    constructor(executor) {
        this.initBind();
        this.initValue();
        try {
            executor(this.resolve, this.reject);
        } catch(err) {
            this.reject(err);
        }
    }

    initBind() {
        // 初始化 resolve 和 reject
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
    }

    initValue() {
        // promise 初始化值为 pending
        this.promiseState = PENDING;
        this.promiseResult = null;
        // 用数组保存回调
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
    }

    resolve(value) {
        // promise state 是不可变的
        if (this.promiseState !== PENDING) {
            return ;
        }
        this.promiseState = FULFILLED;
        this.promiseResult = value;
        // 执行保存的成功回调
        while (this.onFulfilledCallbacks.length) {
            this.onFulfilledCallbacks.shift()(this.promiseResult);
        }
    }

    reject(reason) {
        // promise state 是不可变的
        if (this.promiseState !== PENDING) {
            return ;
        }
        this.promiseState = REJECTED;
        this.promiseResult = reason;
        // 执行保存的失败回调
        while (this.onRejectedCallbacks.length) {
            this.onRejectedCallbacks.shift()(this.promiseResult);
        }
    }

    then(onFulfilled, onRejected) {
        // 接收两个回调 onFulfilled 和 onRejected
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    
        const thenPromise = new MyPromise((resolve, reject) => {
            const resolvePromise = cb => {
                try {
                    const res = cb(this.promiseResult);

                    if (res === thenPromise) {
                        throw new Error('不能返回自身');
                    }

                    if (res instanceof MyPromise) {
                        res.then(resolve, reject);
                    } else {
                        // 如果返回值不是 Promise 就直接成功
                        resolve(res);
                    }
                } catch(err) {
                    // 处理报错
                    reject(err);
                    throw new Error(err);
                }
            };

            if (this.promiseState === FULFILLED) {
                // 成功状态就执行 fulfilled 回调
                resolvePromise(onFulfilled);
            } else if (this.promiseState === REJECTED) {
                resolvePromise(onRejected);
            } else if (this.promiseState === PENDING) {
                // 如果状态保持为 pending, 就要暂存回调
                this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
                this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
            }
        })

        // 返回处理链式的 Promise
        return thenPromise;
    }
}

module.exports = MyPromise;