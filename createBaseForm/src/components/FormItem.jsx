import React,{Component} from 'react' ;
import InputDate from './Input-date.jsx' ;

function FormItem ({type,label,name,rule,form}){
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory({form,type,name,rule})}
            </div>
            <span className="error-tip col-sm-3">{form.getFieldError(name)}</span>
        </div>
    ) ;
}
export default FormItem ;


/**
 * 获取输入框
 */
function InputCompFactory(param){
    let {form,type,name,rule} = param ;
    let inputComp = null ;
    if(['text','email'].includes(type)){
        //value = {} onChange={}
       inputComp = <input type={type}  className='form-control' {...form.getFieldProps(name,{rule})}/> ;
    }else if('textarea' === type){
        inputComp = <textarea className='form-control' {...form.getFieldProps(name,{rule})} ></textarea>
    }else if('date'){
        inputComp = <InputDate {...form.getFieldProps(name,{rule})} />
    }
    return inputComp ;
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