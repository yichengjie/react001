import React,{Component} from 'react' ;
import OCInput from './oc-input.jsx' ;
import OCTextArea from './oc-textarea.jsx' ;
import OCDate from './oc-date.jsx' ;
import OCRadio from './oc-radio.jsx' ;
import OCSelect from './oc-select.jsx' ;
import OCCheckbox from './oc-checkbox.jsx' ;
import OCInputTwo from './oc-input-two.jsx' ;

function handleChange4InputFactory(form,name){
    return function (value){
        //var value = event.target.value ;
        form.setFieldValue(name,value) ;
    }
}

/**
 * 获取输入框$$_a$$_b
 */
function InputCompFactory(param){
    let {type,form,name,options} = param ;
    let inputComp = null ;
     //name ={} value = {} onChange={}
    if(['text','email'].includes(type)){
        inputComp = <OCInput value ={form.getFieldValue(name)} 
            onChange={handleChange4InputFactory(form,name)}/>
    }else if('textarea' === type){
        inputComp = <OCTextArea  value ={form.getFieldValue(name)} 
            onChange={handleChange4InputFactory(form,name)} />
    }else if('date' === type){
        inputComp = <OCDate value ={form.getFieldValue(name)} 
            onChange={handleChange4InputFactory(form,name)}/>
    }else if('select' === type){
        inputComp = <OCSelect value ={form.getFieldValue(name)} 
            onChange={handleChange4InputFactory(form,name)} 
            options ={options}/> ;
    }else if('radio' === type){
        inputComp = <OCRadio value ={form.getFieldValue(name)}
            onChange={handleChange4InputFactory(form,name)} 
            options ={options}/>
    }else if('checkbox' === type){
        inputComp = <OCCheckbox value ={form.getFieldValue(name)}
            onChange={handleChange4InputFactory(form,name)} 
            options ={options}/>
    }else if('textTwo' === type){
        inputComp = <OCInputTwo value ={form.getFieldValue(name)}
            onChange={handleChange4InputFactory(form,name)}/>
    }
    return inputComp ;
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
