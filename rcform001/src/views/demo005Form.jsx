import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm3.jsx' ;


class MyForm extends Component{
    handleSubmit(event){
        event.preventDefault() ;
        var {form} = this ;
        form.handleSubmit(function(flag){
            console.info('form validation return flag : ' + flag) ;
            if(flag){
                console.info('表单验证通过，准备提交表单') ;
            }else{
                console.info('表单验证不通过,请检查 !' ) ;
            }
        }) ;
    }
    //如果有的onChange太特殊，这里可以自己手动调用_inner_handleChange(event)方法
    handleChange(event){
        //...这里可以做一些特殊的事
        this._inner_handleChange(event) ;
    }
    render () {
        let {form} = this ;
        return (
            <div>
                <label htmlFor="">用户名</label>
                <input type = "text" {...form.getFieldProps('username')} />
                <span className="error-tip">{form.getFieldError('username')}</span>
                <br/>

                <label htmlFor="">邮箱</label>
                <input type = "email" {...form.getFieldProps('email')} />
                <span className="error-tip">{form.getFieldError('email')}</span>
                <br/>

                <label htmlFor="">地址</label>
                <input type = "text" {...form.getFieldProps('addr')} />
                <span className="error-tip">{form.getFieldError('addr')}</span>
                <br/>

                <button type="button" onClick={this.handleSubmit.bind(this)}>提交</button>
            </div>
        )
    }
}
export default createForm(MyForm) ;