// shallowEqual.js、verifyPlainObject.js、warning.js、storeShape.js  
const hasOwn = Object.prototype.hasOwnProperty  
  
// 比较变量是否全等，或者普通对象单层比较是否相同  
export default function shallowEqual(a, b) {  
    if (a === b) return true  
  
    let countA = 0  
    let countB = 0  
      
    for (let key in a) {  
        if (hasOwn.call(a, key) && a[key] !== b[key]) return false  
        countA++  
    }  
  
    for (let key in b) {  
        if (hasOwn.call(b, key)) countB++  
    }  
  
    return countA === countB  
}  