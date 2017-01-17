import React,{Component} from 'react' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 


function createForm (WrapperComponent){
    return class HOCComponent extends WrapperComponent{
        constructor(props){
            super(props) ;
            this.state={
                formData:{},
                formError:{},
            } ;
            this._inner_formRules ={} ;
            this.form = genForm(this) ;
            this._inner_handleSubmit = this._inner_handleSubmit.bind(this) ;
            this.form.handleSubmit = this._inner_handleSubmit ;
            //this._inner_handleChange = this._inner_handleChange.bind(this) ;
            //this.handleCustomeValidate = this.handleCustomeValidate.bind(this) ;
        } 
        //增加表格的校验规则
        addFieldValidateRule(fieldName,rule){
            this._inner_formRules[fieldName] = {...rule} ;
        }
        //获取表单项校验规则
        getFieldValidateRule(fieldName){
            return this._inner_formRules[fieldName] ;
        }
        //获取表单的所有校验规则
        getFormValidateRules(){
            return this._inner_formRules ;
        }
        _inner_handleSubmit(callback){/**当执行form的handleSubmit()时 */
            console.info('inner handleSubmit .... ') ;
            console.info('validationRules : ' +JSON.stringify(this.validationRules,null,2)) ;
            //进行校验
            let flag = this._inner_validForm() ;
            if(callback && (typeof callback === 'function')){
                callback.call(this,flag) ;
            }else{
                console.warn('请传入一个callback function') ;
            }
        }//this.handleCustomeValidate(
        _inner_onChangeFactory(fieldName){
            //[{ required: true, message: 'Please input your Password!' }]
           return (event) =>{
               const value = event.target.value ;
               //校验错误提示信息
               this.setState(function(state){
                  state.formData[fieldName] = value ;
                  return state ;
               }) ;
               this._inner_validField(fieldName,value) ;
           }
        }
        //校验整个表单
        _inner_validForm(){
            let rules = this.getFormValidateRules() ;
            let keys = rules && Object.keys(rules) ;
            let allValid = true ;
            keys.forEach(fieldName=>{
                let value = this.state.formData[fieldName] ;
                let tmpFlag = this._inner_validField(fieldName,value) ;
                if(!tmpFlag){
                    allValid = false;
                }
            }) ;
            return allValid ;
        }
        //校验表单的某一个字段
        _inner_validField(fieldName,value){
            let rule = this.getFieldValidateRule(fieldName) ;
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
                errTip = validatorFn && validatorFn.call(this,value) || '' ;
            }
            this.setState(function(state){
                state.formError[fieldName] = errTip ;
                return state ;
            }) ;
            return validFlag ;
        }
    }
}

function getRuleKeyName (rule){
    let {message,...other} = rule ;
    return Object.keys(other)[0] ; 
}

function genForm(vvm){
    return {
        getFieldProps:_fieldPropsFactory(vvm),
        getFieldError:_fieldErrorFactory(vvm)
    }
}
function _fieldErrorFactory(vvm){
    return function (fieldName){
        return vvm.state.formError[fieldName] || '' ;
    }
}
function _fieldPropsFactory(vvm){
    return function (fieldName,options={}){
        let {rule} = options ;
        vvm.addFieldValidateRule(fieldName,rule) ;
        return {
            value:vvm.state.formData[fieldName] || '',
            onChange:vvm._inner_onChangeFactory(fieldName)
        }
    }
}
export default createForm ;

