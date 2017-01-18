import React,{Component} from 'react' ;
function FormItem ({type,label,name,rule,form}){
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory(form,type,name,rule)}
            </div>
            <span className="error-tip col-sm-3">{form.getFieldError(name)}</span>
        </div>
    ) ;
}
export default FormItem ;


/**
 * 获取输入框
 */
function InputCompFactory(form,type,name,rule){
    let inputComp = null ;
    if(['text','email'].includes(type)){
       inputComp = <input type={type} /> ;
    }else if('textarea' === type){
        inputComp = <textarea ></textarea>
    }
    if(inputComp!=null){
         return React.cloneElement(inputComp,{className:'form-control',...form.getFieldProps(name,{rule})},null) ;
    }
    return null ;
}




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