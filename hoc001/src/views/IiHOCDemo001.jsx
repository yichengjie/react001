
import React,{Component} from 'react' ; 
import IiHOC from '../components/IiHOC02.jsx' ;

class Input extends Component{
    constructor(){
        super() ;
        this.type ='input' ;
    }
    render(){
        return (
            <input type="text" name ={this.props.name} value ={this.props.value}/>
        ) ;
    }
}

const InputEnhance = IiHOC(Input) ;

export default class Example extends Component {
    render () {
        return (
            <div>
               <InputEnhance name ="username" />
            </div>
        )
    }
}
