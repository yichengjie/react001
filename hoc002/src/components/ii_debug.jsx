import React,{Component} from 'react' ;
import ReactDOM from 'react-dom' ;

function replacer(key,value){
    if(typeof value =='function'){
        return `function ${value.name}{...}` ;
    }
    return value ;
}

export function stringify(value){
    return JSON.stringify(value,replacer,2) ;
}

export function IIHOC(WrappedComponent){
    return class II extends WrappedComponent{
        render() {
            return (
                <div>
                    <h2>HOC Debugger Component</h2>
                    <p>Props</p>
                    <pre>{stringify(this.props)}</pre>
                    <p>State</p>
                    <pre>{stringify(this.state)}</pre>
                    {super.render()}
                </div>
            );
        }
    }
}

class Example extends Component{
    constructor(props){
        super(props) ;
        this.state={
            name:'yicj',
            email:'626659321@qq.com'
        }
    }
    render(){
        return (
            <div>
                <h2>Wrapped Component</h2>
                <p>Im a wrapped component</p>
            </div>
        ) ;
    }
}
const EnhancedExample = IIHOC(Example) ;

const App = () =>{
    return <EnhancedExample 
        data={(new Date()).toString()} 
        callback={function test(){}} />
}

export default App ;

