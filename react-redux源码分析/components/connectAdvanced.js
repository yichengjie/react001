import hoistStatics from 'hoist-non-react-statics'  
import invariant from 'invariant'  
import { Component, PropTypes, createElement } from 'react'  
  
// 通过向react组件挂载this.subscription对象  
// 将当前组件及其子孙组件的subscription.onStateChange绑定为redux.stroe.dispatch方法的回调  
// subscription.onStateChange方法中，调用this.selector.run重新计算props  
// 本层组件的onStateChange方法通过redux.store.subscribe绑定为回调函数  
//     同时本层组件的onStateChange触发this.subscription.notifyNestedSubs方法  
//     而子组件的onStateChange通过this.subscription.addNestedSub绑定为回调函数  
// 这样redux.store.dispatch就可以触发父子组件的props更新  
import Subscription from '../utils/Subscription'  
  
import storeShape from '../utils/storeShape'  
  
let hotReloadingVersion = 0  
  
// connectAdvanced函数由connect模块内部调用，铰链redux.store和react组件  
//    目的是通过react.props获取redux.state、redux.dispatch(action)的相关特征，传输数据流和派发事件  
//    同时获得redux.dispatch特征的props.actionname派发事件时，触发react.props重新计算和组件视图重绘  
// 返回函数接受react组件构造函数为参数，用以形成高阶组件，作为视图层render方法渲染的参数  
  
// 首参selectorFactory默认为selectorFactory模块  
//    用于定义最终装饰函数mapStateToProps、mapDispatchToProps、mergeProps的执行机制  
//    通过redux、react相关树形，构造react.props计算函数  
// 次参options对象，相关配置  
export default function connectAdvanced(  
    selectorFactory,  
  
    {  
        // the func used to compute this HOC's displayName from the wrapped component's displayName.  
        // probably overridden by wrapper functions such as connect()  
        getDisplayName = name => `ConnectAdvanced(${name})`,  
  
        // 错误提示用  
        methodName = 'connectAdvanced',  
  
        // if defined, the name of the property passed to the wrapped element indicating the number of  
        // calls to render. useful for watching in react devtools for unnecessary re-renders.  
        renderCountProp = undefined,  
  
        // redux.store.state初始化赋值、redux.store.dispatch方法触发时引起store.state变更，是否影响组件的props  
        // 默认影响，shouldHandleStateChanges置为false时不影响，即redux监听state变更不影响react视图渲染  
        // 用户使用react-redux，shouldHandleStateChanges由用户配置的mapStateToProps是否为真值决定  
        shouldHandleStateChanges = true,  
  
        // the key of props/context to get the store  
        storeKey = 'store',  
  
        // if true, the wrapped element is exposed by this HOC via the getWrappedInstance() function.  
        withRef = false,  
  
        // additional options are passed through to the selectorFactory  
        ...connectOptions  
    } = {}  
) {  
    const subscriptionKey = storeKey + 'Subscription'  
    const version = hotReloadingVersion++  
  
    const contextTypes = {  
        [storeKey]: storeShape,  //store:storeShape
        [subscriptionKey]: PropTypes.instanceOf(Subscription),  //storeSubscription:PropTypes.instanceOf(Subscription)
    }  
    const childContextTypes = {  
        [subscriptionKey]: PropTypes.instanceOf(Subscription)  
    }  
  
    // 用户设置connect(mapStateToProps,mapDispatchToProps)(component)中component  
    // 构成高阶组件  
    return function wrapWithConnect(WrappedComponent) {  
        invariant(  
            typeof WrappedComponent == 'function',  
            `You must pass a component to the function returned by ` +  
            `connect. Instead received ${WrappedComponent}`  
        )  
  
        const wrappedComponentName = WrappedComponent.displayName  
            || WrappedComponent.name  
            || 'Component'  
  
        const displayName = getDisplayName(wrappedComponentName)  
  
        const selectorFactoryOptions = {  
            ...connectOptions,  
            getDisplayName,  
            methodName,  
            renderCountProp,  
            shouldHandleStateChanges,  
            storeKey,  
            withRef,  
            displayName,  
            wrappedComponentName,  
            WrappedComponent  
        }  
  
        class Connect extends Component {  
            constructor(props, context) {  
                super(props, context)  
  
                this.version = version  
                this.state = {}  
                this.renderCount = 0  
                // Provider容器组件中，通过context.store向子组件传入Redux的store，storeKey默认为store  
                // 未曾设置Provider的情形下呢？？？？  
                this.store = this.props[storeKey] || this.context[storeKey]  
                // 父组件的subscription回调队列属性，当前为顶层组件时为null 
                //这里的 subscriptionKey = 'storeSubscription' ---> this.subscription || this.parentSub
                this.parentSub = props[subscriptionKey] || context[subscriptionKey]  
  
                this.setWrappedInstance = this.setWrappedInstance.bind(this)  
  
                invariant(this.store,  
                    `Could not find "${storeKey}" in either the context or ` +  
                    `props of "${displayName}". ` +  
                    `Either wrap the root component in a <Provider>, ` +  
                    `or explicitly pass "${storeKey}" as a prop to "${displayName}".`  
                )  
  
                // getState引用当前组件相应Redux的store.getState  
                this.getState = this.store.getState.bind(this.store);  
  
                // 构建this.selector属性，其中props方法获取当前的props，run方法更新props(引用对象形式)  
                this.initSelector()  
  
                // 构建this.subscription回调函数队列，构建subscription.onStateChange方法，但不挂载  
                // componentDidMount方法中，方法  
                // redux.store.dispatch方法执行时，触发父子组件的onStateChange方法  
                //    更新嵌套组件的props，同时按shouldComponentUpdate条件触发组件重绘  
                this.initSubscription()  
            }  
  
            // 将subscription回调队列属性传递给子组件，或者将祖先组件的subscription传递给子组件  
            getChildContext() {  
                return { [subscriptionKey]: this.subscription || this.parentSub }  
            }  
  
            // 挂载父子组件的onStateChange方法，绑定dispatch方法触发时更新组件的props属性以及重绘组件  
            // connect方法执行过程中，由redux.store.state初始化数据更新组件props组件属性  
            componentDidMount() {  
                if (!shouldHandleStateChanges) return  
  
                // 顶层组件redux.store、this.subscrption回调队列中挂载父子组件的onStateChange方法  
                this.subscription.trySubscribe()  
                // connect(mapStateToProps,mapDispatchToProps)方法执行时  
                // redux.store.state初始化绑定到react组件props属性过程中，是否更新组件props属性  
                // 以及重绘组件，默认不重绘？？？  
                this.selector.run(this.props)  
                if (this.selector.shouldComponentUpdate) this.forceUpdate()  
            }  
  
            // 由组件更新后、重绘前的props，触发redux.store.dispatch方法更新props，用于重绘  
            componentWillReceiveProps(nextProps) {  
                this.selector.run(nextProps)  
            }  
  
            // 判断组件是否已由redux机制进行重绘  
            shouldComponentUpdate() {  
                return this.selector.shouldComponentUpdate  
            }  
  
            // 组件取消挂载时释放内存，即connect(mapStateToProps,mapDispatchToProps)(component)中component  
            componentWillUnmount() {  
                if (this.subscription) this.subscription.tryUnsubscribe()  
  
                this.subscription = null  
                this.store = null  
                this.parentSub = null  
                this.selector.run = () => {}  
            }  
  
            // 获取被包裹的UI组件  
            getWrappedInstance() {  
                invariant(withRef,  
                  `To access the wrapped instance, you need to specify ` +  
                  `{ withRef: true } in the options argument of the ${methodName}() call.`  
                )  
                return this.wrappedInstance  
            }  
  
            setWrappedInstance(ref) {  
                this.wrappedInstance = ref  
            }  
  
            // 构建this.selector属性，其中props方法获取当前的props，run方法更新props  
            // 通过redux.store.state更新、redux.store.dispatch方法触发获取最新的props  
            initSelector() {  
                const { dispatch } = this.store  
                const { getState } = this;  
                // 返回react.props计算函数，返回函数在redux.store.dispatch派发action事件时执行  
                const sourceSelector = selectorFactory(dispatch, selectorFactoryOptions)  
  
                const selector = this.selector = {  
                    shouldComponentUpdate: true,  
                    props: sourceSelector(getState(), this.props),// 重新计算react.props  
                    run: function runComponentSelector(props) {  
                        try {  
                            const nextProps = sourceSelector(getState(), props)  
                            if (selector.error || nextProps !== selector.props) {  
                                selector.shouldComponentUpdate = true  
                                selector.props = nextProps  
                                selector.error = null  
                            }  
                        } catch (error) {  
                            selector.shouldComponentUpdate = true  
                            selector.error = error  
                        }  
                    }  
                }            }  
  
            // 构建this.subscription回调函数队列，构建subscription.onStateChange方法，但不挂载  
            // 顶层组件subscription回调函数队列的onStateChange方法由本组件Redux.store.dispatch触发执行  
            // 子组件的onStateChange方法由顶层组件Redux.store.dispatch触发顶层组件相应的onStateChange方法  
            //      最终通过调用顶层组件subscription.notifyNestedSubs方法触发执行  
            // onStateChange方法用于更新嵌套组件的props，同时按shouldComponentUpdate条件触发组件重绘  
            initSubscription() {  
                if (shouldHandleStateChanges) {  
                    const subscription = this.subscription = new Subscription(this.store, this.parentSub)  
                    const dummyState = {}  
                    // 在Subsciption模块中，通过redux.store.dispatch方法触发父子组件的
                    //this.subscription.onStateChange  
                    // 更新嵌套组件的props，同时按shouldComponentUpdate条件触发组件重绘  
                    subscription.onStateChange = function onStateChange() {  
                        // 更新组件的props  
                        this.selector.run(this.props)  
                        // this.selector.shouldComponentUpdate为真值重绘当前组件，否则更新子组件的props、按条件重绘子组件  
                        if (!this.selector.shouldComponentUpdate) {  
                            subscription.notifyNestedSubs()  
                        } else {  
                            // 更新组件完成后执行回调，  
                            this.componentDidUpdate = function componentDidUpdate() {  
                                this.componentDidUpdate = undefined  
                                subscription.notifyNestedSubs()  
                            }  
  
                            // 调用setState更新react组件，setState方法不论prevState、currentState改变与否  
                            // 都会比较组件的props进行重绘？？？  
                            this.setState(dummyState)  
                        }  
                    }.bind(this)  
                }  
            }  
  
            // 判断顶层组件的store及subscription回调函数队列是否挂载父子组件的onStateChange方法  
            isSubscribed() {  
                return Boolean(this.subscription) && this.subscription.isSubscribed()  
            }  
  
            // 通过selector.props添加额外的属性，当组件更新时，又会发生怎样的情况？？？  
            addExtraProps(props) {  
                if (!withRef && !renderCountProp) return props  
                // make a shallow copy so that fields added don't leak to the original selector.  
                // this is especially important for 'ref' since that's a reference back to the component  
                // instance. a singleton memoized selector would then be holding a reference to the  
                // instance, preventing the instance from being garbage collected, and that would be bad  
                const withExtras = { ...props }  
                if (withRef) withExtras.ref = this.setWrappedInstance  
                if (renderCountProp) withExtras[renderCountProp] = this.renderCount++  
                return withExtras  
            }  
  
            render() {  
                const selector = this.selector  
                // 初始化渲染时，以redux更新props后，不予的重绘？？？  
                selector.shouldComponentUpdate = false  
                if (selector.error) {  
                    throw selector.error  
                } else {  
                    return createElement(WrappedComponent, this.addExtraProps(selector.props))  
                }  
            }  
        }  
  
        Connect.WrappedComponent = WrappedComponent  
        Connect.displayName = displayName  
        Connect.childContextTypes = childContextTypes  
        Connect.contextTypes = contextTypes  
        Connect.propTypes = contextTypes  
        // 开发环境，保证props可由redux机制顺利更新，并完成组件重绘  
        if (process.env.NODE_ENV !== 'production') {  
            Connect.prototype.componentWillUpdate = function componentWillUpdate() {  
                if (this.version !== version) {  
                    this.version = version  
                    this.initSelector()  
                    if (this.subscription) this.subscription.tryUnsubscribe()  
                    this.initSubscription()  
                    if (shouldHandleStateChanges) this.subscription.trySubscribe()  
                }  
            }  
        }  
  
        return hoistStatics(Connect, WrappedComponent)  
    }  
}  