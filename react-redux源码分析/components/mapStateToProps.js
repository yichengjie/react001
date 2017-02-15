// mapStateToProps.js  
import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'  
  
// 当用户配置的mapStateToProps是函数时，使用wrapMapToPropsFunc装饰mapStateToProps  
//    传入redux的dispatch方法、react组件的displayName  
export function whenMapStateToPropsIsFunction(mapStateToProps) {  
    return (typeof mapStateToProps === 'function')  
        ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')  
        : undefined  
}  
  
// 当用户配置的mapStateToProps不是函数时，设置默认的mapStateToProps为空函数；否则不设置  
export function whenMapStateToPropsIsMissing(mapStateToProps) {  
    return (!mapStateToProps)  
        ? wrapMapToPropsConstant(() => ({}))  
        : undefined  
}  
  
// 当用户配置的mapStateToProps是函数时，使用wrapMapToPropsFunc装饰mapStateToProps  
//    传入redux的dispatch方法、react组件的displayName  
// 当用户配置的mapStateToProps不是函数时，设置默认的mergeProps为空函数；否则不设置  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性  
export default [  
    whenMapStateToPropsIsFunction,  
    whenMapStateToPropsIsMissing  
]  