// selectorFactory.js  
// 开发环境校验最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps为真值  
// 提示最终装饰函数mapStateToProps、mapDispatchToProps不需要react组件原有props传参  
import verifySubselectors from './verifySubselectors'  
    
// redux.dispatch派发action事件触发时，傻瓜式重新计算react.props  
export function impureFinalPropsSelectorFactory(  
    mapStateToProps,  
    mapDispatchToProps,  
    mergeProps,  
    dispatch  
) {  
    return function impureFinalPropsSelector(state, ownProps) {  
        return mergeProps(  
            mapStateToProps(state, ownProps),  
            mapDispatchToProps(dispatch, ownProps),  
            ownProps  
        )  
    }  
}  
  
// 定义最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps的执行机制  
// 按条件分为初始化执行，调用handleFirstCall函数；再次执行，调用pureFinalPropsSelector  
//    并传入redux相关的state、dispatch属性，react相关的ownProps属性  
//    返回函数，用于重新获取react组件的props  
// 与impureFinalPropsSelectorFactory的差别时  
//    impureFinalPropsSelectorFactory每次触发redux.dispatch，均重新计算react.props  
//    pureFinalPropsSelectorFactory是优化计算方案，state、props改变时才重新计算  
export function pureFinalPropsSelectorFactory(  
    mapStateToProps,  
    mapDispatchToProps,  
    mergeProps,  
    dispatch,  
    { areStatesEqual, areOwnPropsEqual, areStatePropsEqual }  
) {  
    let hasRunAtLeastOnce = false// redux.store同react.props是否关联过一次标识  
    let state// 缓存上一次redux.store.state  
    let ownProps// 缓存上一次react.props  
    let stateProps// 缓存上一次redux.store.state赋值给react.props的属性  
    let dispatchProps// 缓存上一次redux.store.dispatch构造的特定派发action方法赋值给react.props的属性  
    let mergedProps// 缓存stateProps、dispatchProps、ownProps复合集，react组件待更新的props  
  
    // 初始化将redux.store.state、redux.store.dispatch按条件赋值给react.props  
    function handleFirstCall(firstState, firstOwnProps) {  
        state = firstState  
        ownProps = firstOwnProps  
  
        // 将redux.store.state赋值给react.props，特定情况下需要react组件原有的props设定赋值情况  
        stateProps = mapStateToProps(state, ownProps)  
  
        // 将redux.store.dispatch构造的特定派发action方法赋值给react.props  
        // 特定情况下需要react组件原有的props设定赋值情况  
        dispatchProps = mapDispatchToProps(dispatch, ownProps)  
  
        // 混合stateProps、dispatchProps赋值给react.props，特定情况下需要react组件原有的props设定赋值情况  
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps)  
  
        hasRunAtLeastOnce = true  
        return mergedProps  
    }  
  
    // redux的dispatch触发且react组件props改变时，重新获取redux.store.state、redux.store.dispatch相应属性  
    // 按条件赋值给react.props  
    function handleNewPropsAndNewState() {  
        // 因redux的dispatch触发、react组件props改变，重新将redux.store.state绑定在react.props属性上  
        stateProps = mapStateToProps(state, ownProps)  
  
        // 因react.props变动，重新将redux.dispatch特定的派发方法绑定在react.props属性上  
        if (mapDispatchToProps.dependsOnOwnProps)  
            dispatchProps = mapDispatchToProps(dispatch, ownProps)  
  
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps)  
        return mergedProps  
    }  
  
    // react组件props改变时，重新获取redux.store.state、redux.store.dispatch相应属性，按条件赋值给react.props  
    function handleNewProps() {  
        if (mapStateToProps.dependsOnOwnProps)  
            stateProps = mapStateToProps(state, ownProps)  
  
        // 因react.props变动，重新将redux.dispatch特定的派发方法绑定在react.props属性上  
        if (mapDispatchToProps.dependsOnOwnProps)  
            dispatchProps = mapDispatchToProps(dispatch, ownProps)  
  
        mergedProps = mergeProps(stateProps, dispatchProps, ownProps)  
        return mergedProps  
    }  
  
    // redux的dispatch触发，引起state改变时，重新获取redux.store.state，按条件赋值给react.props  
    // redux机制，dispatch(action)触发事件后，state在回调函数执行前已改变  
    function handleNewState() {  
        const nextStateProps = mapStateToProps(state, ownProps)  
        const statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps)  
        stateProps = nextStateProps  
          
        if (statePropsChanged)  
            mergedProps = mergeProps(stateProps, dispatchProps, ownProps)  
  
        return mergedProps  
    }  
      
    // redux.dispatch事件触发时，重新将redux.store.state、redux.store.dispatch按条件赋值给react.props  
    // react.props改变需要在redux.dispatch事件触发过程中发生  
    function handleSubsequentCalls(nextState, nextOwnProps) {  
        // 默认判断react.props是否修改，需要重新将redux.state、redux.dispatch按条件赋值给react.props  
        // 用户重写判断机制，可以实现修改react.props部分属性时，避过react-redux通过redux.store重新计算props  
        const propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps)  
          
        // 默认判断redux.state是否修改，需要重新将redux.state、redux.dispatch按条件赋值给react.props  
        // 用户重写判断机制，可以实现修改redux.state部分属性时，避过react-redux通过redux.store重新计算props  
        const stateChanged = !areStatesEqual(nextState, state)  
  
        state = nextState  
        ownProps = nextOwnProps  
  
        // redux的dispatch触发且react组件props改变时，重新获取redux.store.state、redux.store.dispatch相应属性  
        // 按条件赋值给react.props  
        if (propsChanged && stateChanged) return handleNewPropsAndNewState()  
  
        // react组件props改变时，重新获取redux.store.state、redux.store.dispatch相应属性，按条件赋值给react.props  
        if (propsChanged) return handleNewProps()  
  
        // redux的dispatch触发，引起state改变时，重新获取redux.store.state，按条件赋值给react.props  
        if (stateChanged) return handleNewState()  
  
        // redux的dispatch未曾触发且react组件props未曾改变，直接返回前一次props  
        return mergedProps  
    }  
  
    // 返回函数，优点是可以使用闭包变量缓存前次的state及ownProps  
    // 定义最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps的执行机制  
    // 传入redux相关的state、dispatch属性，react相关的ownProps属性  
    return function pureFinalPropsSelector(nextState, nextOwnProps) {  
        return hasRunAtLeastOnce  
            ? handleSubsequentCalls(nextState, nextOwnProps)  
            : handleFirstCall(nextState, nextOwnProps)  
    }  
}  
  
// connectAdvanced模块中调用，通过connect模块传入，返回react.props计算函数  
// 参数dispatch为redux.store的dispatch方法，次参对象为react组件的属性  
//    各参数传给装饰函数initMapStateToProps、initMapDispatchToProps、initMergeProps  
//    获取mapStateToProps、mapDispatchToProps、mergeProps计算react组件待变更的props  
export default function finalPropsSelectorFactory(dispatch, {  
    initMapStateToProps,  
    initMapDispatchToProps,  
    initMergeProps,  
    ...options  
}) {  
    // 获取最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps，用以计算计算react组件待变更的props  
    const mapStateToProps = initMapStateToProps(dispatch, options)  
    const mapDispatchToProps = initMapDispatchToProps(dispatch, options)  
    const mergeProps = initMergeProps(dispatch, options)  
  
    // 开发环境校验最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps为真值  
    // 提示最终装饰函数mapStateToProps、mapDispatchToProps不需要react组件原有props传参  
    if (process.env.NODE_ENV !== 'production') {  
        verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName)  
    }  
  
    // options.pure在connect模块中设置默认为真值  
    const selectorFactory = options.pure  
        ? pureFinalPropsSelectorFactory// 傻瓜式计算react.props  
        : impureFinalPropsSelectorFactory// 优化计算react.props  
  
    // 定义最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps调用机制，并传入dispatch、options参数  
    // 返回react.props计算函数  
    return selectorFactory(  
        mapStateToProps,  
        mapDispatchToProps,  
        mergeProps,  
        dispatch,  
        options  
    )  
} 