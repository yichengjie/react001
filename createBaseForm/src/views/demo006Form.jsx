import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm5.jsx' ;
import {stringify} from '../common/common.js' ;
import FormItem from '../components/FormItem.jsx' ;

class MyForm extends Component{
    handleSubmit(event){
        event.preventDefault() ;
        var {form} = this ;
        console.info('this.state.formData : ' , stringify(this.state.formData)) ;
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
        let username ={require:true,validator:'handleChangeUsername'} ;
        let email = {email:true} ;
        let addr = {validator:'handleChangeAddr'} ;
        return (
            <div>
               <FormItem type="text" label="用户名" name="username" 
                    rule ={username}  form={form}  />
                <FormItem type="email" label="邮箱" name="email" 
                    rule={email} form={form}  />
               <FormItem type="password" label="地址" name="addr" 
                    rule={addr} form={form}  />
               <button type="button" onClick={this.handleSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}
export default createForm(MyForm) ;