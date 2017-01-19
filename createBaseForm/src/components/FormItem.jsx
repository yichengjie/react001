import React,{Component} from 'react' ;
import OCInput from './oc-input.jsx' ;
import OCTextArea from './oc-textarea.jsx' ;
import OCDate from './oc-date.jsx' ;
import OCRadio from './oc-radio.jsx' ;
import OCSelect from './oc-select.jsx' ;
import OCCheckbox from './oc-checkbox.jsx' ;

function FormItem ({type,label,name,rule,form,options}){
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory({form,type,name,rule,options})}
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
    let {form,type,name,rule,options} = param ;
    let inputComp = null ;
     //name ={} value = {} onChange={}
    if(['text','email'].includes(type)){
        inputComp = <OCInput {...form.getFieldProps(name,{rule})} />
    }else if('textarea' === type){
        inputComp = <OCTextArea {...form.getFieldProps(name,{rule})}/>
    }else if('date' === type){
        inputComp = <OCDate {...form.getFieldProps(name,{rule})} />
    }else if('select' === type){
        inputComp = <OCSelect options={options}  {...form.getFieldProps(name,{rule})}/> ;
    }else if('radio' === type){
        inputComp = <OCRadio options={options}  {...form.getFieldProps(name,{rule})} />
    }else if('checkbox' === type){
        inputComp = <OCCheckbox  options={options}  {...form.getFieldProps(name,{rule})}/>
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