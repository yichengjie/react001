import React,{Component} from 'react' ;

function refsHOC(WrappedComponent){
    return class RefsHOC extends Component{
        constructor(){
            super() ;
            this.proc = this.proc.bind(this) ;
        }
        /**
         * @param wrappedComponentInstance 被包裹的的组件本身
         */
        proc(wrappedComponentInstance){
            wrappedComponentInstance.method() ;
        }
        render () {
            //const props = Object.assign({},this.props,{ref:this.proc.bind(this)}) ;
            return (
                <WrappedComponent {...this.props} ref ={this.proc} />
            )
        }
    }
}