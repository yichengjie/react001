import { Component, PropTypes, Children } from 'react'  
// 传入Subscription的意义及用法？？？  
import Subscription from '../utils/Subscription'  
import storeShape from '../utils/storeShape'  
import warning from '../utils/warning'  
// 开发环境下，组件更新时store变更，打印错误  
let didWarnAboutReceivingStore = false  
function warnAboutReceivingStore() {  
    if (didWarnAboutReceivingStore) {  
        return  
    }  
    didWarnAboutReceivingStore = true  
    warning(  
        '<Provider> does not support changing `store` on the fly. ' +  
        'It is most likely that you see this error because you updated to ' +  
        'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' +  
        'automatically. See https://github.com/reactjs/react-redux/releases/' +  
        'tag/v2.0.0 for the migration instructions.'  
    )  
}  
// Provider作为容器组件，向子组件上下文对象context注入props.store，即Redux的store  
export default class Provider extends Component {  
    getChildContext() {  
        return { store: this.store, storeSubscription: null }  
    }  
    constructor(props, context) {  
        super(props, context)  
        this.store = props.store  
    }  
    render() {  
        return Children.only(this.props.children)  
    }  
}  
if (process.env.NODE_ENV !== 'production') {  
    Provider.prototype.componentWillReceiveProps = function (nextProps) {  
        const { store } = this  
        const { store: nextStore } = nextProps  
  
        if (store !== nextStore) {  
            warnAboutReceivingStore()  
        }  
    }  
}  
Provider.propTypes = {  
    store: storeShape.isRequired,  
    children: PropTypes.element.isRequired  
}  
Provider.childContextTypes = {  
    store: storeShape.isRequired,  
    storeSubscription: PropTypes.instanceOf(Subscription)  
}  
Provider.displayName = 'Provider'  