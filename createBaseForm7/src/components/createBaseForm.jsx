import React,{Component} from 'react' ;
import {validationFn,validationMessages} from  '../common/validator.js'; 
import {isArray,stringify} from '../common/common.js' ;
import FormItem from './FormItem.jsx' ;
import { connect } from 'react-redux';
import {setFieldValue} from '../redux/createBaseForm/formData.js' ;
import {initFormSchema} from '../redux/createBaseForm/formSchema.js' ;

function createForm (WrapperComponent,getSchemaApi){
    class HOCComponent extends WrapperComponent{
        constructor(props){
            super(props) ;
            this.form = {
                setFieldValue:this._form_setFieldValue.bind(this),
                getFieldValue:this._form_getFieldValue.bind(this) ,
                getFieldHideFlag:this._form_getFieldHideFlag.bind(this),
                getFieldError:this._form_getFieldError.bind(this),
                setFieldValueAndValidate:this._form_setFieldValueAndValidate.bind(this),
                validateForm:this._form_validateForm.bind(this),
                getFormData:this._form_getFormData.bind(this)
            } ;
            this._inner_initFormSchema() ;
        } 
        /**私有方法start */
        _inner_initFormSchema(){
            let promise = getSchemaApi.call(null);
            promise.then((retData)=>{
                this.props.initFormSchema(retData) ;
            }) ;
        }
        _form_setFieldValue(fieldName,fieldValue){
            this.props.setFieldValue(fieldName,fieldValue) ;
        }
        _form_getFieldValue(fieldName){
           return this.props.formData[fieldName] ;
        }
        _inner_getFormSchema(){
            return this.props.formSchema ;
        }
        _form_getFieldHideFlag(){
            return false;
        }
        _form_getFieldError(){
            return '' ;
        }
        _form_setFieldValueAndValidate(fieldName,fieldValue){
            this._form_setFieldValue(fieldName,fieldValue) ;
        }
        _form_validateForm(){
            return true ;
        }
        _form_getFormData(){
            return this.props.formData
        }
        /**公共方法api end */
        renderBaseForm () {
            return (
                <form  className="form-horizontal" role="form" >
                     {renderFormSchema(this._inner_getFormSchema(),this.form)}
                </form>
            )
        }

    }
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(HOCComponent) ;
}
// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
    formData: state.formData,
    formSchema:state.formSchema
  };
}
// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    setFieldValue: (fieldName,fieldValue) => dispatch(setFieldValue(fieldName,fieldValue)),
    initFormSchema:(formSchema) => dispatch(initFormSchema(formSchema)) ,
  };
}
function renderFormSchema(formSchema,form){
    return formSchema.map(function(schema,index){
        return  <FormItem schema={schema}  form={form} key ={index} /> ;
    }) ;
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
export default createForm ;

