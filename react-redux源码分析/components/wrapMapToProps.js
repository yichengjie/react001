// wrapMapToProps.js  
// 普通对象校验  
import verifyPlainObject from '../utils/verifyPlainObject'  
  
// 当用户配置的mapDispatchToProps为对象形式时，在mapDispatchToProps模块的whenMapDispatchToPropsIsObject函数中调用  
// 参数getConstant为dispatch => bindActionCreators(mapDispatchToProps, dispatch)函数  
//      接受dispatch作为参数，生成特定派发action的方法，对象形式，最终挂载给react组件的props属性  
//      即调用props.actionname派发特定的action  
// 返回函数形式；同用户配置的mapDispatchToProps为函数时统一接口，为函数时需要接受dispatch方法作为参数  
//      函数返回值为对象形式，用于更新react组件的props属性  
export function wrapMapToPropsConstant(getConstant) {  
    return function initConstantSelector(dispatch, options) {  
        const constant = getConstant(dispatch, options)  
  
        function constantSelector() { return constant }  
        // react-redux自动派发action时，不需要根据react原有的props去判断派发何种action  
        constantSelector.dependsOnOwnProps = false   
        return constantSelector  
    }  
}  
  
// 通过redux的state、dispatch更新react组件的props时，是否需要原有的props作为参数，就此形成新的props  
// 用户配置的mapStateToProps、mapDispatchToProps为函数，可添加dependsOnOwnProps属性  
// 当其为真值时，意味通过redux的state、dispatch更新react组件的props时，需要原有的props作为参数   
export function getDependsOnOwnProps(mapToProps) {  
    return (mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined)  
        ? Boolean(mapToProps.dependsOnOwnProps)  
        : mapToProps.length !== 1  
}  
  
// 当用户配置的mapStateToProps(即mapStateToProps、mapDispatchToProps)为函数形式时     
// 参数methodName校验提示用，由connect模块通过match方法调用mapStateToProps或mapDispatchToProps模块传入  
//    在connect模块中构建initProxySelector函数  
//    initProxySelector在sconnectAdvanced模块中接受redux.dispatch、react.displayName作为参数  
//        返回mapToPropsProxy封装函数  
//    mapToPropsProxy在selectorFactory模块中接受redux.state|dispatch、react.displayName作为参数  
//        正式用户配置的mapStateToProps或mapDispatchToProps函数，更新react.props  
export function wrapMapToPropsFunc(mapToProps, methodName) {  
    // selectorFactory模块中调用，返回值赋给mapStateToProps或mapDispatchToProps  
    // 参数dispatch为容器store的dispatch方法，displayName为容器的displayName  
    return function initProxySelector(dispatch, { displayName }) {  
  
        const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {  
            return proxy.dependsOnOwnProps  
                ? proxy.mapToProps(stateOrDispatch, ownProps)  
                : proxy.mapToProps(stateOrDispatch)  
        }  
  
        // 判断通过redux的state、dispatch更新react组件的props时，是否需要原有的props作为参数，就此形成新的props  
        proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)  
  
        // 参数stateOrDispatch、ownProps在selectorFactory模块中传入  
        //      针对mapStateToProps传入state，针对mapDispatchToProps传入dispatch  
        // 通过proxy.mapToProps方法执行过程中按条件重写proxy.mapToProps，构成递归调用proxy.mapToProps  
        // 第一次调用proxy.mapToProps，动态传入react组件原有的props  
        // 第二次调用proxy.mapToProps，执行用户配置的mapStateToProps、mapDispatchToProps更新props  
        // 第三次调用proxy.mapToProps，当mapDispatchToProps返回执行redux.store.dispatch的函数时  
        //      通过递归调用更新props  
        proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {  
            // 重新设定proxy.mapToProps为用户传入的mapToProps函数(即mapStateToProps、mapDispatchToProps)  
            // 当再次调用proxy函数时将获取mapToProps返回对象并执行  
            proxy.mapToProps = mapToProps  
            let props = proxy(stateOrDispatch, ownProps)  
  
            // 用户传入的mapToProps函数(即mapStateToProps、mapDispatchToProps)返回函数  
            // 通常是mapDispatchToProps，需要通过执行redux.store.dispatch更新props  
            // 再次调用proxy获取该函数的返回对象  
            if (typeof props === 'function') {  
                proxy.mapToProps = props  
                proxy.dependsOnOwnProps = getDependsOnOwnProps(props)  
                props = proxy(stateOrDispatch, ownProps)  
            }  
  
            // 校验props为普通对象  
            if (process.env.NODE_ENV !== 'production') verifyPlainObject(props, displayName, methodName)  
  
            // 用户传入的mapToProps函数返回值，对象形式  
            // 即connect接口接受的mapStateToProps或mapDispatchToProps参数函数返回值  
            return props  
        }  
  
        return proxy  
    }  
}  