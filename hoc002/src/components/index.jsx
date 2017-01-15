import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;

function Reform (WrappedComponent){
    return class ReformEnhancer extends WrappedComponent{
        constructor (props){
            super(props) ;
            this.state ={
                fileds:{}
            }
        }
        render(){
            debugger ;
            const props = Object.assign({},this.props,{
                ref:'test'
            }) ;
            let r = React.createElement(WrappedComponent,props,null) ;
            let i = this.refs.test ;
            return r ;
        }
    }
}

class Example extends Component{
    constructor(props){
        super(props) ;
    }
    method(){}
    render(){
        return (
            <form action="">
                <input type="text" name ="email"/><br/>
                <input type="text" name ="something" required/>
            </form>
        ) ;
    }
}


const EnhancedExample = Reform(Example) ;

let App = () =>{
    return <EnhancedExample />
}

export default App ;