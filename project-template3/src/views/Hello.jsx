import  React,{Component} from 'react'
import ChildComp from './ChildComp.jsx' ;

class HelloComp extends Component {
    render(){
        return (
            <div>
                <ChildComp/>
                <h1>hello world fdfsd</h1>
            </div>
        )
    }
}

export default HelloComp