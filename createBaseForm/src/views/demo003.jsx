import React from 'react' ;
import { createForm } from 'rc-form';
class Form extends React.Component {
  componentWillMount() {
    this.requiredDecorator = this.props.form.getFieldDecorator({
        name: 'required',
        rules: [{required: true}],
    });
  }
  submit = () => {
    this.props.form.validateFields((error, value) => {
      console.log(error, value);
    });
  }
  handleChange =()=>{

  }
  render() {
    let errors;
    const { getFieldError } = this.props.form;
    return (<div>
      {
          this.requiredDecorator(<input onChange={this.handleChange}/>)
      }
      {(errors = getFieldError('required')) ? errors.join(',') : null}
      <button onClick={this.submit}>submit</button>
    </div>)
  }
}

export default createForm()(Form);