import React,{Component} from 'react' ;
import Demo005Form from './demo005Form.jsx' ;
import '../styles/app.scss' ;

class Demo005 extends Component{
    constructor(){
        super() ;
        this.handleSubmit = this.handleSubmit.bind(this) ;
    }
    handleSubmit(){
        let myform = this.refs.myform ;
        console.info(myform.state.formData) ;
    }
    render () {
        return (
            <div>
                <button type="button" onClick={this.handleSubmit}>提交</button>
                <Demo005Form ref="myform"/>
            </div>
        )
    }
}

export default Demo005 ;

