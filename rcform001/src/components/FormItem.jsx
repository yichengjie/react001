import React,{Component} from 'react' ;

export default class FormItem extends Component{
    constructor(props){
        super(props) ;
    }
    render(){
        let {type,label,name,options,form} = this.props ;
        return (
            <div>
                <label htmlFor="">{label}</label>
                <input type = {type} {...form.getFieldProps(name,options)} />
                <span className="error-tip">{form.getFieldError(name)}</span>
                <br/>
                <br/>
            </div>
        ) ;
    }
}