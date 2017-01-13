import React,{Component} from 'react' ;
import createForm from '../components/createBaseForm.jsx' ;


class MyForm extends Component{

    render () {
        let {form} = this.props ;
        return (
            <div>
                <input type = "text" {...form.getFieldProps('username')} />
            </div>
        )
    }
}

export default createForm(MyForm) ;