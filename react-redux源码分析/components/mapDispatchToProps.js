// mapDispatchToProps.js  
import { bindActionCreators } from 'redux'  
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'  
  
// 当用户配置的mapDispatchToProps是函数时，使用wrapMapToPropsFunc装饰mapDispatchToProps  
//    传入redux的dispatch方法、react组件的displayName  
export function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {  
    return (typeof mapDispatchToProps === 'function')  
        ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps')  
        : undefined  
}  
  
// 当用户配置的mapDispatchToProps不是函数时，设置默认的mapDispatchToProps为输出redux.store.dispatch方法；否则不设置  
export function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {  
    return (!mapDispatchToProps)  
        ? wrapMapToPropsConstant(dispatch => ({ dispatch }))  
        : undefined  
}  
  
// 当用户配置的mapDispatchToProps是对象时，调用bindActionCreators生成特定派发方法；否则返回undefined  
export function whenMapDispatchToPropsIsObject(mapDispatchToProps) {  
    return (mapDispatchToProps && typeof mapDispatchToProps === 'object')  
        ? wrapMapToPropsConstant(dispatch => bindActionCreators(mapDispatchToProps, dispatch))  
        : undefined  
}  
// 当用户配置的mapDispatchToProps是函数时，使用wrapMapToPropsFunc装饰mapDispatchToProps  
//    传入redux的dispatch方法、react组件的displayName  
// 当用户配置的mapDispatchToProps不是函数时，设置默认的mapDispatchToProps为输出redux.store.dispatch方法；否则不设置  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性  
export default [  
    whenMapDispatchToPropsIsFunction,  
    whenMapDispatchToPropsIsMissing,  
    whenMapDispatchToPropsIsObject  
]  