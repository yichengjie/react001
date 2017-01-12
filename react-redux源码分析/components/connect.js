// connectAdvanced函数由connect模块内部调用，铰链redux.store和react组件  
//    目的是通过react.props获取redux.state、redux.dispatch(action)的相关特征，传输数据流和派发事件  
//    同时获得redux.dispatch特征的props.actionname派发事件时，触发react.props重新计算和组件视图重绘  
// 返回函数接受react组件构造函数为参数，用以形成高阶组件，作为视图层render方法渲染的参数  
import connectAdvanced from '../components/connectAdvanced'  
  
// 比较变量是否全等，或者普通对象单层比较是否相同  
import shallowEqual from '../utils/shallowEqual'  
  
// 当用户配置的mapDispatchToProps是函数时，使用wrapMapToPropsFunc装饰mapDispatchToProps  
//    传入redux的dispatch方法、react组件的displayName  
// 当用户配置的mapDispatchToProps不是函数时，设置默认的mapDispatchToProps为输出redux.store.dispatch方法；否则不设置  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性  
import defaultMapDispatchToPropsFactories from './mapDispatchToProps'  
  
// 当用户配置的mapStateToProps是函数时，使用wrapMapToPropsFunc装饰mapStateToProps  
//    传入redux的dispatch方法、react组件的displayName  
// 当用户配置的mapStateToProps不是函数时，设置默认的mergeProps为空函数；否则不设置  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性Props为空函数；否则不设置  
import defaultMapStateToPropsFactories from './mapStateToProps'  
  
// 当用户配置的mergeProps是函数时，使用wrapMergePropsFunc装饰mergeProps  
//    传入redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual  
// 当用户配置的mergeProps不是函数时，设置默认的mergeProps为defaultMergeProps  
// 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
// 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性Props为空函数；否则不设置  
import defaultMergePropsFactories from './mergeProps'  
  
// 传入connectAdvanced模块  
// 函数，以redux.store.dispatch、react.options为参数，返回react.props计算函数  
import defaultSelectorFactory from './selectorFactory'  
  
// factories为数组形式的函数队列，用于装饰用户配置的mapStateToProps、mapDispatchToProps、mergeProps（作为参数）  
// 根据参数为空、为函数、为对象，按条件构造装饰函数构造器  
//     该构造器接受相应redux的dispatch方法及react组件的options属性与方法  
//     并传入mapStateToProps、mapDispatchToProps、mergeProps函数中，或redux方法改造mapDispatchToProps函数  
//     完成装饰，最终结果是赋予react组件的props，以redux.store.state，redux.store.dispatch的方法与属性  
// 针对react组件更新重绘的情形，这一过程由挂载在react组件props上的redux.store.dispatch引起  
//     通过挂载在react组件上的this.selector.run重新计算props，获取redux.store.state，redux.store.dispatch  
//     this.selector.run在react组件上挂载this.subscription实例的onStateChange方法上调用  
//     而本层组件的onStateChange方法通过redux.store.subscribe绑定为回调函数  
//          同时本层组件的onStateChange触发this.subscription.notifyNestedSubs方法  
//          而子组件的onStateChange通过this.subscription.addNestedSub绑定为回调函数  
//          这样redux.store.dispatch就可以触发父子组件的props更新  
//     最终调用react组件的setState方法重绘组件  
function match(arg, factories, name) {  
    for (let i = factories.length - 1; i >= 0; i--) {  
        const result = factories[i](arg)  
        if (result) return result  
    }  
  
    return (dispatch, options) => {  
        throw new Error(`Invalid value of type ${typeof arg} for ${name} argument when connecting component ${options.wrappedComponentName}.`)  
    }  
}  
  
// 判断是否完全相等  
function strictEqual(a, b) { return a === b }  
  
// createConnect函数通常为内部调用，各参数均为默认值；这样处理的好处是便于模块化，在各模块中设置默认值  
export function createConnect({  
    connectHOC = connectAdvanced,  
    mapStateToPropsFactories = defaultMapStateToPropsFactories,  
    mapDispatchToPropsFactories = defaultMapDispatchToPropsFactories,  
    mergePropsFactories = defaultMergePropsFactories,  
    selectorFactory = defaultSelectorFactory  
} = {}) {  
  
    // connect函数作为外部api接口，各参数均由用户传入；返回函数，接受待包装的react组件作为参数  
    // 通过内部调用connectHOC(selectorFactory,options)(basicComponent)构造基于react组件的高阶组件basicComponent  
    // 该组件赋予selector属性，其中selector.run方法用于重新计算props  
    //    计算props的过程，需要通过传入当前redux.store的dispatch方法、高阶组件属性options  
    //    借此装饰用户配置mapStateToProps、mapDispatchToProps、mergeProps函数，mapDispatchToProps可以是对象  
    // 该组件赋予subscription属性，通过subscription.onStateChange作为redux.store.dispatch的直接或间接回调函数  
    //    而subscription.onStateChange内部调用react.selector.run重新计算样式值、react.setState重绘组件  
    // 注：用户配置的mapStateToProps、mapDispatchToProps为函数，可添加dependsOnOwnProps属性  
    //    当其为真值时，意味通过redux的state、dispatch更新react组件的props时，需要原有的props作为参数   
  
    // mapStateToProps将redux.store.state映射给props，store.state变动引起props相应变动  
    //    示例：redux.store.state改变，将引起props.todos属性作相应改变  
    // const mapStateToProps = (state) => {  
    //   return {  
    //     todos: getVisibleTodos(state.todos, state.visibilityFilter)  
    //   }  
    // }  
    // const getVisibleTodos = (todos, filter) => {  
    //   switch (filter) {  
    //     case 'SHOW_ALL':  
    //       return todos  
    //     case 'SHOW_COMPLETED':  
    //       return todos.filter(t => t.completed)  
    //     case 'SHOW_ACTIVE':  
    //       return todos.filter(t => !t.completed)  
    //     default:  
    //       throw new Error('Unknown filter: ' + filter)  
    //   }  
    // }  
  
    // mapDispatchToProps将redux.store.dispatch映射给props，便于通过props[actionname]调用redux.store.dispatch方法  
    //    示例1：可通过props.onClick()触发redux事件机制，即通过dispatch派发action  
    //          dispatch方法由装饰函数传入  
    //          mapDispatchToProps为函数形式，待装饰，才可以传入dispatch方法  
    // const mapDispatchToProps = (  
    //   dispatch,  
    //   ownProps  
    // ) => {  
    //   return {  
    //     onClick: () => {  
    //       dispatch({  
    //         type: 'SET_VISIBILITY_FILTER',  
    //         filter: ownProps.filter  
    //       });  
    //     }  
    //   };  
    // }  
    //    示例2：props.onClick()将通过react-redux内部机制自动调用dispatch派发action，action由mapDispatchToProps构造  
    //          装饰过程中调用redux的bindActionCreators生成用于派发相应action的方法，内部调用dispatch方法  
    //          mapDispatchToProps为对象形式，才可以调用redux的bindActionCreators方法  
    //  const mapDispatchToProps = {  
    //   onClick: (filter) => {  
    //     type: 'SET_VISIBILITY_FILTER',  
    //     filter: filter  
    //   };  
    // }  
    return function connect(  
        mapStateToProps,  
        mapDispatchToProps,  
        mergeProps,  
        // 可重写的属性包括areStatesEqual、areOwnPropsEqual、areStatePropsEqual、areMergedPropsEqual  
        //    以及methodName(错误提示用)、等  
        {  
            // 真值时，redux.dispatch派发action事件触发时，将优化react.props计算方案  
            // 否值时，傻瓜式重新计算react.props  
            pure = true,  
  
            // 默认判断redux.state是否修改，需要重新将redux.state、redux.dispatch按条件赋值给react.props  
            // 用户重写判断机制，可以实现修改redux.state部分属性时，避过react-redux通过redux.store重新计算props  
            areStatesEqual = strictEqual,  
  
            // 默认判断react.props是否修改，需要重新，需要重新将redux.state、redux.dispatch按条件赋值给react.props  
            // 用户重写判断机制，可以实现修改react.props部分属性时，避过react-redux通过redux.store重新计算props  
            areOwnPropsEqual = shallowEqual,  
  
            // 由mapStateToProps函数获得的stateProps是否与前一次相同，可避免react.props的重新赋值  
            areStatePropsEqual = shallowEqual,  
  
            // 由redux.state、redux.dispatch混合构造的mergeProps是否与前一次相同，可避免react.props的重新赋值  
            areMergedPropsEqual = shallowEqual,  
            ...extraOptions  
        } = {}  
    ) {  
  
          // 当用户配置的mapStateToProps是函数时，使用wrapMapToPropsFunc装饰mapStateToProps  
          //    传入redux的dispatch方法、react组件的displayName  
          // 当用户配置的mapStateToProps不是函数时，设置默认的mergeProps为空函数；否则不设置  
          // 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
          // 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性Props为空函数；否则不设置  
          const initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps')  
            
          // 当用户配置的mapDispatchToProps是函数时，使用wrapMapToPropsFunc装饰mapDispatchToProps  
          //    传入redux的dispatch方法、react组件的displayName  
          // 当用户配置的mapDispatchToProps不是函数时，设置默认的mapDispatchToProps为输出redux.store.dispatch方法；否则不设置  
          // 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
          // 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性  
          const initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps')  
            
          // 当用户配置的mergeProps是函数时，使用wrapMergePropsFunc装饰mergeProps  
          //    传入redux的dispatch方法、react组件的displayName、pure、areMergedPropsEqual  
          // 当用户配置的mergeProps不是函数时，设置默认的mergeProps为defaultMergeProps  
          // 接受待装饰函数，返回装饰函数构造器，执行后装饰函数  
          // 数组项在connect模块的match函数中挨个调用，输出为真值时即返回，增加编码的灵活性Props为空函数；否则不设置  
          const initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps')  
  
          return connectHOC(selectorFactory, {  
              methodName: 'connect',// 用于错误提示  
  
               // used to compute Connect's displayName from the wrapped component's displayName.  
              getDisplayName: name => `Connect(${name})`,  
  
              // react.store.dispatch（外部接口为react.props.actionname）触发改变props，是否重绘组件  
              shouldHandleStateChanges: Boolean(mapStateToProps),  
  
              initMapStateToProps,  
              initMapDispatchToProps,  
              initMergeProps,  
              pure,  
              areStatesEqual,  
              areOwnPropsEqual,  
              areStatePropsEqual,  
              areMergedPropsEqual,  
  
              ...extraOptions  
        })  
    }  
  
}  
  
export default createConnect() 