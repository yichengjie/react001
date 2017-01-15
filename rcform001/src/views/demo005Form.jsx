import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
import createForm from '../components/createBaseForm2.jsx' ;

class MyForm extends Component{
    render () {
        let {form} = this.props ;
        console.info( 'form : ' ,form) ;
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