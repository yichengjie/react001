import React,{Component} from 'react' ;
import createForm from '../components/createBaseForm.jsx' ;
class MyForm extends Component{
    render () {
        let {form} = this.props ;
        return (
            <div>
                <input type = "text" {...form.getFieldProps('username')} /><br/>
                <span className="error-tip">{form.getFieldError('username')}</span><br/>
                <button type="button" onClick={form.handleSubmit}>提交</button>
            </div>
        )
    }
}
export default createForm(MyForm) ;