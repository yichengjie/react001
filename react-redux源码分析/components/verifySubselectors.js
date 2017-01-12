// verifySubselectors.js  
import warning from '../utils/warning'  
  
function verify(selector, methodName, displayName) {  
    // 校验最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps为真值  
    if (!selector) {  
        throw new Error(`Unexpected value for ${methodName} in ${displayName}.`)  
  
    // 提示最终装饰函数mapStateToProps、mapDispatchToProps不需要react组件原有props传参  
    } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {  
        if (!selector.hasOwnProperty('dependsOnOwnProps')) {  
            warning(  
                `The selector for ${methodName} of ${displayName} did not specify a value for dependsOnOwnProps.`  
            )  
        }  
    }  
}  
  
export default function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {  
    verify(mapStateToProps, 'mapStateToProps', displayName)  
    verify(mapDispatchToProps, 'mapDispatchToProps', displayName)  
    verify(mergeProps, 'mergeProps', displayName)  
}  