import React,{Component} from 'react' ;
import OCInput from './oc-input.jsx' ;
import OCTextArea from './oc-textarea.jsx' ;
import OCDate from './oc-date.jsx' ;
import OCRadio from './oc-radio.jsx' ;
import OCSelect from './oc-select.jsx' ;
import OCCheckbox from './oc-checkbox.jsx' ;

function handleChange4InputFactory(form,name){
    return function (value){
        //var value = event.target.value ;
        form.setFieldValue(name,value) ;
    }
}

function handleValidateFactory(form,name){
    return function (value){
        //console.info(`name:${name} , value: ${value}`) ;
        form.validateField(name,value) ;
    }
}

/**
 * 获取输入框$$_a$$_b
 */
function InputCompFactory({form,schema}){
    let {type,name,rule} = schema ;
    let inputComp = null ;
    if('complex' === type){
        inputComp = getComplexInputComp(form,schema) ;
    }else{
        inputComp = getSimpleInputComp(form,schema) ;
    }
    return inputComp ;
}
/**
 * 简单类型
 */
function getSimpleInputComp(form,schema,index){
    let {type,name,rule} = schema ;
    let inputComp = null ;
     //name ={} value = {} onChange={}
    if(['text','email'].includes(type)){
        inputComp = <OCInput />
    }else if('textarea' === type){
        inputComp = <OCTextArea />
    }else if('date' === type){
        inputComp = <OCDate />
    }else if('select' === type){
        inputComp = <OCSelect options ={schema.options} /> ;
    }else if('radio' === type){
        inputComp = <OCRadio options ={schema.options}/>
    }else if('checkbox' === type){
        inputComp = <OCCheckbox options ={schema.options}/>
    }
    return inputComp ==null ? null : React.cloneElement(inputComp,{
        value:form.getFieldValue(name),
        width:schema.width,
        handleChange:handleChange4InputFactory(form,name),
        handleValidate:handleValidateFactory(form,name),
        key:index
    }) ;
}

function getComplexInputComp(form,schema){
    let {fields,divline} = schema ;
    let arr = [] ;
    let len = fields.length ;
    //let spNum = len-1 ;
    //let spWidth = divline ? 4 : 2 ;
    //let width = parseInt((100 - spNum*spWidth)/len);
    for(let i =0 ;i < len ; i ++){
        let tmpInput = getSimpleInputComp(form,fields[i],i) ;
        arr.push(tmpInput) ;
        //arr.push(React.cloneElement(tmpInput,{style: {width:width}})) ;
        //如果中间有分割线则将分割线显示出来
        if(i< len-1){
            if(divline){
                arr.push(<span key={'sp'+i} className="split-line"></span>) ;
            }else{
                arr.push(<span key={'sp'+i} className="split-line-none"></span>) ;
            }
        }
    }
    return (
        <span className="input-complex">
            {arr}
        </span>
    )
}

function getFieldErrorStr(form,schema){
   let type = schema.type ;
   if(type==='complex'){
        let fields = schema.fields ;
        let errorStr = '' ;
        for(let field of fields){
            let name = field.name ;
            let error = form.getFieldError(name) 
            if(error && error.trim() !== ''){
                errorStr = error ;
                break ;
            }
        }
        return errorStr ;
   }else{
       let name = schema.name;
       return form.getFieldError(name) ;
   }
}

function FormItem ({form,schema}){
    let {label} = schema ;
    return (
        <div className="form-group">
            <label  className="col-sm-2 control-label">{label}</label>
            <div className="col-sm-5">
                {InputCompFactory({form,schema})}
            </div>
            <span className="error-tip col-sm-3">{getFieldErrorStr(form,schema)}</span>
        </div>
    ) ;
}
export default FormItem ;
