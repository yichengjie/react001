import React,{Component} from 'react';
import SimpleEditForm from '../components/SimpleEditForm.jsx' ;
export default class BaseEditPage extends Component{
  constructor(props){
      super(props) ;
      this.state= {} ;
      this.handleInputChange = this.handleInputChange.bind(this); 
      this.handleSubmitForm = this.handleSubmitForm.bind(this) ;
  }
  handleInputChange(propObj){/***简单对象变化 */
     let keys = Object.keys(propObj) ;
     let name = keys[0] ;
     let value = propObj[name] ;
     let newFormData = this.state.formData.set(name,value);
     this.setState({formData:newFormData}) ;
  }
  render(){
    return (
      <div>
        <SimpleEditForm 
          schemaFields={this.state.schemaFields}
          formData={this.state.formData}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleSubmitForm}/>
      </div>
    ) ;
  }
}