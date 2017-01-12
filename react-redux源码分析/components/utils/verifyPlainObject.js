// verifyPlainObject.js  
import isPlainObject from 'lodash/isPlainObject'  
import warning from './warning'  
  
// 校验value是否普通对象  
export default function verifyPlainObject(value, displayName, methodName) {  
    if (!isPlainObject(value)) {  
        warning(  
            `${methodName}() in ${displayName} must return a plain object. Instead received ${value}.`  
        )  
    }  
}  