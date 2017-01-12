// mergeProps.js  
// 普通对象校验  
import verifyPlainObject from '../utils/verifyPlainObject'  
  
// 默认的mergeProps，原样输出stateProps, dispatchProps, ownProps  
export function defaultMergeProps(stateProps, dispatchProps, ownProps) {  
    return { ...ownProps, ...stateProps, ...dispatchProps }  
}  
  
// 装饰用户配置的mergeProps，传入redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual  
export function wrapMergePropsFunc(mergeProps) {  
    // 将redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual等属性传入mergeProps  
    // 用于警告提示或者mergeProps方法中使用，mergeProps中可直接使用dispatch方法  
    return function initMergePropsProxy(  
        dispatch, { displayName, pure, areMergedPropsEqual }  
    ) {  
        let hasRunOnce = false  
        let mergedProps// 缓存前一次混合mergedProps  
  
        return function mergePropsProxy(stateProps, dispatchProps, ownProps) {  
            // mergeProps(stateProps, dispatchProps, ownProps)  
            //    将mapStateToProps获得的stateProps、mapDispatchToProps获得的dispatchProps、  
            //    以及react组件原有的ownProps，混合为新的props  
            const nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps)  
  
            // redux.dispatch事件触发时，傻瓜式重新计算混合props或优化计算props  
            if (hasRunOnce) {  
                if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps))  
                    mergedProps = nextMergedProps  
  
            // react和redux初始化关联时，返回初次计算生成的nextMergedProps  
            } else {  
                hasRunOnce = true  
                mergedProps = nextMergedProps  
  
                // 校验mergedProps为普通对象  
                if (process.env.NODE_ENV !== 'production')  
                  verifyPlainObject(mergedProps, displayName, 'mergeProps')  
            }  
  
            return mergedProps  
        }  
    }  
}  
  
// 当用户配置的mergeProps是函数时，使用wrapMergePropsFunc装饰mergeProps  
//    传入redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual  
// 当用户配置的mergeProps不是函数时，返回undefined  
export function whenMergePropsIsFunction(mergeProps) {  
    return (typeof mergeProps === 'function')  
        ? wrapMergePropsFunc(mergeProps)  
        : undefined  
}  
  
// 当用户配置的mergeProps不是函数时，设置默认的mergeProps为defaultMergeProps；否则不设置  
export function whenMergePropsIsOmitted(mergeProps) {  
    return (!mergeProps)  
        ? () => defaultMergeProps  
        : undefined  
}  
  
// 当用户配置的mergeProps是函数时，使用wrapMergePropsFunc装饰mergeProps  
//    传入redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual  
// 当用户配置的mergeProps不是函数时，设置默认的mergeProps为defaultMergeProps  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性  
export default [  
    whenMergePropsIsFunction,  
    whenMergePropsIsOmitted  
]  