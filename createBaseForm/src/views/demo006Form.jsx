import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm5.jsx' ;
import {stringify} from '../common/common.js' ;
import FormItem from '../components/FormItem.jsx' ;
import {getUserEditFormSchemaApi} from '../api/Api2.js' ;


class MyForm extends Component{

    componentDidMount () {
        let promise = getUserEditFormSchemaApi() ;
        promise.then((retData)=>{
            this.setState({formSchema:retData}) ;
        }) ;
    }

    handleSubmit(event){
        event.preventDefault() ;
        var {form} = this ;
        //console.info('this.state.formData : ' , stringify(this.state.formData)) ;
        form.handleSubmit(function(flag){
            console.info('form validation return flag : ' + flag) ;
            if(flag){
                console.info('表单验证通过，准备提交表单') ;
            }else{
                console.info('表单验证不通过,请检查 !' ) ;
            }
        }) ;
    }   
    //自定义校验
    handleChangeUsername(value){
        let addr = this.state.formData.addr || '' ;
        //console.info(this.state.formData) ;
        if(addr === '' && value == '123'){
            return  '地址为空时，用户名不能为123' ;
        }
        return '' ;
    }
    handleChangeAddr(value){
        let username = this.state.formData.username ;
        if(username==='123' && value === '456'){
            return '如果用户名为123，地址不能为456' ;
        }
        return '' ;
    }
    render () {
        let {form} = this ;
        return (
            <div>
                {renderFormSchema(this.state.formSchema,form)}
               <button type="button" onClick={this.handleSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}
function renderFormSchema(formSchema,form){
    return formSchema.map(function(item,index){
        return  <FormItem {...item}  form={form} key ={index} /> ;
    }) ;
}
export default createForm(MyForm) ;