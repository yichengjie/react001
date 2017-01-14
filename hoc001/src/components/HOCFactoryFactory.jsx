import React,{Component} from 'react' ;
function HOCFactoryFactory (...params){
    //do something with params
    return function HOCFactory(WrappedComponent){
        return class HOC extends Component{
            render(){
                return <WrappedComponent {...this.props} />
            }
        }
    }
}
//demo HOCFactoryFactory(params)(WrappedComponent)