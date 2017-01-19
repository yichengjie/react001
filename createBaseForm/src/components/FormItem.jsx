import React,{Component} from 'react' ;
import OCInput from './oc-input.jsx' ;
import OCTextArea from './oc-textarea.jsx' ;
import OCDate from './oc-date.jsx' ;
import OCRadio from './oc-radio.jsx' ;
import OCSelect from './oc-select.jsx' ;
import OCCheckbox from './oc-checkbox.jsx' ;
/**
 * 获取输入框
 */
function InputCompFactory(param){
    let {form,type,name,rule,options} = param ;
    let inputComp = null ;
     //name ={} value = {} onChange={}
    if(['text','email'].includes(type)){
        inputComp = <OCInput/>
    }else if('textarea' === type){
        inputComp = <OCTextArea />
    }else if('date' === type){
        inputComp = <OCDate />
    }else if('select' === type){
        inputComp = <OCSelect /> ;
    }else if('radio' === type){
        inputComp = <OCRadio />
    }else if('checkbox' === type){
        inputComp = <OCCheckbox />
    }
    return inputComp == null ? null : 
        React.cloneElement(inputComp,{...form.getFieldProps(name,{rule}),options},null) ;
}

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
