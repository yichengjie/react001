import React,{Component} from 'react' ;
function FormItem ({type,label,name,rule,form}){
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input type = {type} {...form.getFieldProps(name,{rule})} />
            <span className="error-tip">{form.getFieldError(name)}</span>
            <br/>
            <br/>
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