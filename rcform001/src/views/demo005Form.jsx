import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
import createForm from '../components/createBaseForm2.jsx' ;

class MyForm extends Component{
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
                
                <button type="button" onClick={form.handleSubmit}>提交</button>
            </div>
        )
    }
}
export default createForm(MyForm) ;