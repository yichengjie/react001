import { createForm } from 'rc-form';
import React from 'react' ;

class Form extends React.Component {
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);


      
    });
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<div>
      <input {...getFieldProps('normal')}/>
      <input {...getFieldProps('required', {
        onChange(){}, // have to write original onChange here if you need
        rules: [{required: true}],
      })}/>
      <button onClick={this.submit}>submit</button><br/>
      {(errors = getFieldError('required')) ? errors.join(',') : null}
    </div>)
  }
}

export default createForm()(Form);