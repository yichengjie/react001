import { createForm } from 'rc-form';
import React from 'react' ;



class Form extends React.Component {
  
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log('error',error);
      console.info(' value ' , value) ;
    });
  }
 
  render() {
    console.info(this.props.form) ;
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div>
      <input type ="text" {...getFieldProps('normal')} />
      <input type="text" {...getFieldProps('required', {
        onChange(){}, // have to write original onChange here if you need
        rules: [{required: true}],
      })} />
      <button onClick={this.submit}>submit</button><br/>
      {(errors = getFieldError('required')) ? errors.join(',') : null}
    </div>)
  }
}

export default createForm()(Form);