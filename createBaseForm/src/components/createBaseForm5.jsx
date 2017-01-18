import React,{Component} from 'react' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 
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
            this._inner_formRules ={} ;
            this.form = genForm(this) ;
            this._inner_handleSubmit = this._inner_handleSubmit.bind(this) ;
            this.form.handleSubmit = this._inner_handleSubmit ;
            //this._inner_handleChange = this._inner_handleChange.bind(this) ;
            //this.handleCustomeValidate = this.handleCustomeValidate.bind(this) ;
        } 
        componentDidMount () {
            let promise = getSchemaApi.call(null);
            promise.then((retData)=>{
                this.setState({formSchema:retData}) ;
                //当页面的控件加载完毕后执行initPageParam函数
                this.initPageParam && this.initPageParam();
            }) ;
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
        _inner_handleSubmit(event){/**当执行form的handleSubmit()时 */
            console.info('inner handleSubmit .... ') ;
            //console.info('validationRules : ' +JSON.stringify(this.getFormValidateRules(),null,2)) ;
            //进行校验
            //调用父类的提交钩子函数
            let flag = this._inner_validForm() ;
            this.handleSubmit && this.handleSubmit.call(this,flag) ;
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
                errTip = validatorFn && validatorFn.call(this,value,fieldName) || '' ;
            }
            this.setState(function(state){
                state.formError[fieldName] = errTip ;
                return state ;
            }) ;
            return validFlag ;
        }
        _inner_handleReset(){
            let newFormData = getClearSimpleObj(this.state.formData) ;
            let newFormError = getClearSimpleObj(this.state.formError) ;
            this.setState({formData:newFormData,formError:newFormError}) ;
        }
        // _inner_handleSubmit(event){
        //     console.info('event 111111111111 : ' ,event) ;
        //     event.preventDefault() ;    
        // }
        render () {
            return (
                <form  className="form-horizontal" role="form" >
                     {renderFormSchema(this.state.formSchema,this.form)}
                     <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="button" className="btn btn-default" onClick={this._inner_handleSubmit.bind(this)}>提交</button>
                            {'     '}
                            <button type="button" className="btn btn-danger" onClick={this._inner_handleReset.bind(this)}>重置</button>
                        </div>
                     </div>
                </form>
            )
        }

    }
}


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
    return formSchema.map(function(item,index){
        return  <FormItem {...item}  form={form} key ={index} /> ;
    }) ;
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

