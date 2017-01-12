const CLEARED = null  
const nullListeners = { notify() {} }  
  
// 类似jquery的Callbacks回调函数队列，用于向队列next中添加和移除回调函数，以及触发回调函数的执行  
function createListenerCollection() {  
    let current = []  
    let next = []  
  
    return {  
        clear() {  
            next = CLEARED  
            current = CLEARED  
        },  
  
        notify() {  
            const listeners = current = next  
            for (let i = 0; i < listeners.length; i++) {  
                listeners[i]()  
            }  
        },  
  
        subscribe(listener) {  
            let isSubscribed = true  
            if (next === current) next = current.slice()  
            next.push(listener)  
  
            return function unsubscribe() {  
                if (!isSubscribed || current === CLEARED) return  
                isSubscribed = false  
  
                if (next === current) next = current.slice()  
                next.splice(next.indexOf(listener), 1)  
            }  
        }  
    }  
}  
  
// 通过向react组件挂载this.subscription对象  
// 将当前组件及其子孙组件的subscription.onStateChange绑定为redux.stroe.dispatch方法的回调  
// subscription.onStateChange方法中，调用this.selector.run重新计算props  
// 本层组件的onStateChange方法通过redux.store.subscribe绑定为回调函数  
//     同时本层组件的onStateChange触发this.subscription.notifyNestedSubs方法  
//     而子组件的onStateChange通过this.subscription.addNestedSub绑定为回调函数  
// 这样redux.store.dispatch就可以触发父子组件的props更新  
export default class Subscription {  
    constructor(store, parentSub) {  
        this.store = store  
        this.parentSub = parentSub  
        this.unsubscribe = null  
        this.listeners = nullListeners  
    }  
  
    // 添加回调函数，默认内部subscription方法使用  
    // 向父组件的subscription回调函数队列添加子组件subscription对象的onStateChange方法  
    addNestedSub(listener) {  
        this.trySubscribe()  
        return this.listeners.subscribe(listener)  
    }  
  
    // 触发回调函数执行，默认connectAdvanced模块构建的onStateChange方法内使用  
    // 父组件的subscription回调函数队列触发子组件subscription对象的onStateChange方法  
    notifyNestedSubs() {  
        this.listeners.notify()  
    }  
  
    // 顶层组件的store及subscription回调函数队列是否挂载父子组件的onStateChange方法  
    isSubscribed() {  
        return Boolean(this.unsubscribe)  
    }  
  
    // 挂载this.onStateChange方法，用于重新获得props，触发this.setState更新组件  
    // 当前组件为顶层组件，this.store挂载this.onStateChange方法  
    // 当前组件为子组件，通过父组件的onStateChange调用subscription.notifyNestedSubs挂载this.onStateChange方法  
    trySubscribe() {  
        if (!this.unsubscribe) {  
            // this.onStateChange is set by connectAdvanced.initSubscription()  
            // 当前组件为顶层组件时，通过this.store.subscribe挂载this.onStateChange方法  
            //    即通过this.store.dispatch方法触发state改变的同时，同时触发this.onStateChange方法  
            // 当前组件为子组件时，通过父组件的onStateChange调用subscription.notifyNestedSubs  
            //    触发子组件的onStateChange方法  
            // 怎样更新组件？？？  
            this.unsubscribe = this.parentSub  
              ? this.parentSub.addNestedSub(this.onStateChange)  
              : this.store.subscribe(this.onStateChange)  
         
            this.listeners = createListenerCollection()  
        }  
    }  
  
    tryUnsubscribe() {  
        if (this.unsubscribe) {  
            this.unsubscribe()  
            this.unsubscribe = null  
            this.listeners.clear()  
            this.listeners = nullListeners  
        }  
    }  
}  