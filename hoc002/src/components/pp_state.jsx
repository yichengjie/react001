import React,{Component} from 'react' ;

import {IIHOC as DebuggerHOC,stringify} from './ii_debug.jsx' ;

// Props Proxy and state abstraction demonstration
function PPHOC (WrappedComponent){
    return class PP extends Component {
        constructor(props){
            super(props) ;
            this.state = {fileds:{}} ;
        }
        getField(filedName){
            if(!this.state.fileds[filedName]){
                this.state.fileds[filedName] ={
                    value:'',
                    onChange:event=>{
                        this.state.fileds[filedName].value = event.target.value ;
                        this.forceUpdate() ;
                    }
                };
            }
            return {
                value:this.state.fileds[filedName].value,
                onChange:this.state.fileds[filedName].onChange
            } ;
        }
        render(){
            const props = Object.assign({},this.props,{
                fileds:this.getField.bind(this) 
            }) ;
            return (
                <div>
                    <h2>PP HOC</h2>
                    <p>Im a Props Proxy HOC that abstracts controlled inputs</p>
                    <WrappedComponent {...props} /> 
                </div>
            ) ;
        }
    }
}


class Example extends Component {
    render(){
        return (
            <div>
                <h2>Wrapped Component</h2>
                <p>Props</p>
                <pre>{stringify(this.props)}</pre>
                <form action="">
                    <label htmlFor="">Automatically controlled</label>
                    <input type="email" {...this.props.fileds('email')}/>
                </form>
            </div>
        ) ;
    }
}

const EnhancedExample = DebuggerHOC(PPHOC(Example)) ;

const App = ()=>{
    return <EnhancedExample date={(new Date).toISOString()}/> ;
}

export default App ;
