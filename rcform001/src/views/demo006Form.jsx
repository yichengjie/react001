import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm4.jsx' ;
import {stringify} from '../common/common.js' ;

class MyForm extends Component{
    constructor(props){
        super(props) ;
    }
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
        return (
            <div>

                <label htmlFor="">用户名</label>
                <input type = "text" {...form.getFieldProps('username',{
                    rules:[{required:true,message:'用户名必填!'}],
                    validator:'handleChangeUsername'
                })} />
                <span className="error-tip">{form.getFieldError('username')}</span>
                <br/>
                <br/>

                <label htmlFor="">邮箱</label>
                <input type = "email" {...form.getFieldProps('email',{
                    rules:[{email:true,message:'邮箱格式不合法!'}]
                })} />
                <span className="error-tip">{form.getFieldError('email')}</span>
                <br/>
                <br/>

                <label htmlFor="">地址</label>
                <input type = "text" {...form.getFieldProps('addr',{
                  validator:'handleChangeAddr'  
                })} />
                <span className="error-tip">{form.getFieldError('addr')}</span>
                <br/>
                <br/>

                <button type="button" onClick={this.handleSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}
export default createForm(MyForm) ;