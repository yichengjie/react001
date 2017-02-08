import React,{Component} from 'react' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 
import {isArray,stringify} from '../common/common.js' ;
import FormItem from './FormItem.jsx' ;

function createForm (WrapperComponent,getSchemaApi){
    return class HOCComponent extends WrapperComponent{
        constructor(props){
            super(props) ;
            this.state={
                formData:{},
                formError:{},
                formSchema:[]
            } ;
            //这个是专供内部使用的校验规则
            this._inner_formRules ={} ;
            this.form = {
                //handleSubmit: this._form_handleSubmit.bind(this) ,
                handleReset:this._form_handleReset.bind(this) ,
                setFieldValue:this._form_setFieldValue.bind(this),
                getFieldValue:this._form_getFieldValue.bind(this) ,
                getFieldError:this._form_getFieldError.bind(this),
                validateField:this._form_validSingleField.bind(this),
                validateForm:this._form_validateForm.bind(this)
            } ;
            this._inner_initFormSchema() ;
        } 

        /**私有方法start */
        _inner_initFormSchema(){
            let promise = getSchemaApi.call(null);
            promise.then((retData)=>{
                let initialState = getFormDefaultValueState(retData) ;
                this.setState({formData:initialState,formSchema:retData}) ;
                this._inner_assembleFormValidRule(retData) ;
                this.initPageParam() ;
            }) ;
        }
        //组装表单的所有字段校验规则
        _inner_assembleFormValidRule(formSchema){
            formSchema.forEach((schemaItem) => {
                let {type} = schemaItem ;
                if(type==='complex'){
                    let {fields} = schemaItem;
                    fields.forEach((field) => {
                        let {name,rule} = field; 
                        this._inner_formRules[name] = {...rule} ;
                    }) ; 
                }else{
                    let {name,rule} = schemaItem; 
                    this._inner_formRules[name] = {...rule} ;
                }
            }) ;
        }
        //获取表单项校验规则
        _inner_getSingleFieldValidateRule(fieldName){
            return this._inner_formRules[fieldName] ;
        }
        //获取表单的所有校验规则
        _inner_getAllFieldValidateRules(){
            return this._inner_formRules ;
        }  
        /**私有方法end */
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////////////////
        /**公共方法api start */
        //从服务器获取表单的显示以及校验信息
        // _form_handleSubmit(event){/**当执行form的handleSubmit()时 */
        //     console.info('inner handleSubmit .... ') ;
        //     //console.info('validationRules : ' +JSON.stringify(this.getFormValidateRules(),null,2)) ;
        //     //进行校验
        //     //调用父类的提交钩子函数
        //     let flag = this._inner_validForm() ;
        //     this.handleSubmit && this.handleSubmit.call(this,flag) ;
        // }//this.handleCustomeValidate
        //校验整个表单
        _form_validateForm(){
            let rules = this._inner_getAllFieldValidateRules() ;
            let keys = rules && Object.keys(rules) ;
            let allValid = true ;
            keys.forEach(fieldName=>{
                let value = this.state.formData[fieldName] ;
                let tmpFlag = this._form_validSingleField(fieldName,value) ;
                if(!tmpFlag){
                    allValid = false;
                }
            }) ;
            //console.info('------- > ' , stringify(this.state.formError));
            return allValid ;
        }
        _form_handleReset(){
            let newFormData = getClearSimpleObj(this.state.formData) ;
            let newFormError = getClearSimpleObj(this.state.formError) ;
            this.setState({formData:newFormData,formError:newFormError}) ;
        }

        _form_setFieldValue(fieldName,fieldValue){
          var oldformData = this.state.formData ;
          var newFormData = Object.assign({},oldformData,{[fieldName]:fieldValue}) ;
          this.setState({
            formData:newFormData
          }) ; 
          //并触发校验
          //this._inner_validSingleField(fieldName,fieldValue) ;
        }

        _form_getFieldValue(name){
            return this.state.formData[name] ;
        }

        _form_getFieldError(fieldName){
            return this.state.formError[fieldName] || '' 
        }
         //校验表单的某一个字段
        _form_validSingleField(fieldName,value){
            let rule = this._inner_getSingleFieldValidateRule(fieldName) ;
            if(rule==null) return false;
            //如果存在校验规则
            let {validator,...other} = rule ;
            //other :{email: true}
            var keys = Object.keys(other) ;
            let errTip = '' ;
            let validFlag = true ;
            for(let key of keys){
                let param = other[key] ;
                if(validationFn[key]){
                   let flag = validationFn[key].call(null,value,param) ;
                   if(!flag){//如果校验没有通过的话
                      validFlag = false;
                      errTip= validationMessages[key].call(null,fieldName,param) ;
                      break ;
                   }
                } 
            }
            //如果上面的静态校验通过了，还存在自定义校验的话，将进行自定义校验
            if(errTip.length==0 && validator && Object.prototype.toString.call(validator) === '[object String]' &&validator.length>0 ){
                let validatorFn = this[validator] ;
                errTip = validatorFn && validatorFn.call(this,value,fieldName) || '' ;
                if(errTip&&errTip.length>0){
                    validFlag = false ;
                }
            }
            this.setState(function(state){
                state.formError[fieldName] = errTip ;
                return state ;
            }) ;
            return validFlag ;
        }
        /**公共方法api end */
        renderBaseForm () {
            return (
                <form  className="form-horizontal" role="form" >
                     {renderFormSchema(this.state.formSchema,this.form)}
                </form>
            )
        }

    }
}


/**
 * 从FormSchema中获取默认的formData数据
 */
function getFormDefaultValueState(fieldSchemaList){
    let obj = {} ;
    for(let item of fieldSchemaList){
        let {type} = item ;
        if(type==='complex'){
           let {fields} = item;
           fields.forEach(function(field){
                let {name,defaultValue} = field; 
                obj[name] = defaultValue ;
           }) ; 
        }else{
            let {name,defaultValue} = item; 
            obj[name] = defaultValue ;
        }
    }
    return obj ;
}

/**
 * 清空表单内容
 */
function getClearSimpleObj(obj){
    let newObj = {} ;
    if(obj!=null){
        let keys = Object.keys(obj) ;
        keys.forEach(key=>{
            newObj[key] = getDefaultValue(obj[key]) ;
        }) ;
    }
    return newObj ;
}

function getDefaultValue(value){
    if(value == null){
        return null ;
    }else{
        let str = Object.prototype.toString.call(value) ;
        return defaultValueMap[str]  ;
    }
}

let defaultValueMap ={
    '[object String]':'',
    '[object Array]':[],
    '[object Number]':null,
    '[object Boolean]':null,
    '[object Date]':null
} ;


function renderFormSchema(formSchema,form){
    return formSchema.map(function(schema,index){
        return  <FormItem schema={schema}  form={form} key ={index} /> ;
    }) ;
}

function getRuleKeyName (rule){
    let {message,...other} = rule ;
    return Object.keys(other)[0] ; 
}

export default createForm ;

