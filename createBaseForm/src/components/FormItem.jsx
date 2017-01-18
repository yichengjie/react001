import React,{Component} from 'react' ;
function FormItem ({type,label,name,rule,form}){
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">


                <input type = {type} className="form-control" {...form.getFieldProps(name,{rule})} />

                
            </div>
            <span className="error-tip col-sm-2">{form.getFieldError(name)}</span>
        </div>
    ) ;
}

export default FormItem ;
// export default class FormItem extends Component{
//     render(){
//         let {type,label,name,options,form} = this.props ;
//         return (
//             <div>
//                 <label htmlFor="">{label}</label>
//                 <input type = {type} {...form.getFieldProps(name,options)} />
//                 <span className="error-tip">{form.getFieldError(name)}</span>
//                 <br/>
//                 <br/>
//             </div>
//         ) ;
//     }
// }