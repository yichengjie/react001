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
                formSchema:[],
                hideState:{}
            } ;
            //这个是专供内部使用的校验规则
            this._inner_formRules ={} ;
            this.form = {
                //handleSubmit: this._form_handleSubmit.bind(this) ,
                handleReset:this._form_handleReset.bind(this) ,
                setFieldValue:this._form_setFieldValue.bind(this),
                setFieldValueAndValidate:this._form_setFieldValueAndValidate.bind(this),
                getFieldValue:this._form_getFieldValue.bind(this) ,
                getFieldError:this._form_getFieldError.bind(this),
                //validateField:this._form_validSingleField.bind(this),
                //validateField:this._form_validSingleField2.bind(this),
                validateForm:this._form_validateForm.bind(this),
                getFieldHideFlag:this._form_getFieldHideFlag.bind(this),
                setFieldHideFlag:this._form_setFieldHideFlag.bind(this)
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
        _inner_clearFieldError(fieldName){
            //console.info(`fieldName : ${fieldName} , ${stringify(this.state.formError)}`) ;
            this.setState(function(state){
                let newFormError = Object.assign({},state.formError,{[fieldName]:null}) ;
                state.formError = newFormError ;
                return state ;
            }) ;
        }
        _inner_resetFieldValue(fieldName){
            //如果callback存在，当设置完formData后执行callback
            this.setState(function(state){
                let oldValue = state.formData[fieldName] ;
                let defaultValue = getDefaultValue(oldValue) ;
                let newFormData = Object.assign({},state.formData,{[fieldName]:defaultValue}) ;
                state.formData = newFormData ;
                return state ;
            }) ;
            //this.setState({formData:newFormData}) ;
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
            //console.info('rules : ' , stringify(rules)) ;
            let keys = rules && Object.keys(rules) ;
            let allValid = true ;
            keys.forEach(fieldName=>{
                //let hideFlag = 
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
          this.setState(function(state){
             var oldformData = state.formData ;
             var newFormData = Object.assign({},oldformData,{[fieldName]:fieldValue}) ;
             state.formData = newFormData ;
             return state ;
          }) ;
        }
        //设置并校验
         _form_setFieldValueAndValidate(fieldName,fieldValue){
            this._form_setFieldValue(fieldName,fieldValue) ;
            //console.info(`fieldName :　${fieldName} , fieldValue : ${fieldValue} `) ;
            this._form_validSingleField(fieldName,fieldValue) ;
         }

        // _form_setFieldValues(obj){
        //      var oldformData = this.state.formData ;
        //     var newFormData = Object.assign({},oldformData,obj) ;
        //     //当value设置完成以后触发校验
        //     this.setState({formData:newFormData},()=>{//并触发校验
        //         this._form_validSingleField(fieldName,fieldValue) ;
        //     }) ; 
        // }

        _form_getFieldValue(fieldName){
            return this.state.formData[fieldName] ;
        }

        _form_getFieldError(fieldName){
            return this.state.formError[fieldName] || '' 
        }
        _form_getFieldHideFlag(fieldName){
            //console.info(`getFieldHideFlag () , fieldName : ${fieldName}` , this.state.hideState) ;
            return this.state.hideState[fieldName] || false ;
        }

        //设置字段的显隐状态
        _form_setFieldHideFlag(fieldName,hideFlag){
            //console.info(`xxx -- -- fieldName : ${fieldName} , hideFlag : ${hideFlag}`) ;
            if(hideFlag){//如果隐藏当前字段
                //清空要字段的错误提示信息清空
                this._inner_clearFieldError(fieldName) ;
                //将字段的value置为空
                this._inner_resetFieldValue(fieldName) ;
            }
            return this.setState(function(state){
                let newHideState = Object.assign({},state.hideState,{[fieldName]:hideFlag}) ;
                state.hideState = newHideState ;
                return state ;
            }) ;
        }
        // _form_validSingleField2(fieldName,value){
        // }
         //校验表单的某一个字段
        _form_validSingleField(fieldName,value){
            let hideFlag = this.form.getFieldHideFlag(fieldName) ;
            if(hideFlag){
                return true;
            }
            //如果字段没有隐藏，则进行常规校验
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
                let newFormError = Object.assign({},state.formError,{[fieldName]:errTip}) ;
                state.formError= newFormError ;
                return state ;
            }) ;

            // if(fieldName === 'age'){
            //     console.info(`fieldName : ${fieldName} , value: ${value} , hideFlag : ${hideFlag} , validFlag : ${validFlag}, errTip : ${errTip}`) ;
            //     //debugger ;
            // }
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
    '[object Number]':'',
    '[object Boolean]':'',
    '[object Date]':''
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

