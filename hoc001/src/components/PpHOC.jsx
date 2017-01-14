import React,{Component} from 'react' ;

function ppHOC(WrappedComponent){
    //Props Proxy
    return class PP extends Component{
        render() {
            const newProps = {
                user:currentLoggerInUser
            } ;
            //等价于 React.createElement(WrappedComponent,this.props,null) ;
            return <WrappedComponent {...this.props} {...newProps} /> ;
        }
    }
}