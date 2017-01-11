import React,{Component} from 'react';
import SimpleEditForm from '../components/SimpleEditForm.jsx' ;
export default class BaseEditPage extends Component{
  constructor(props){
      super(props) ;
      this.state= {
          schemaFields:[],
          formData:{}
      } ;
      this.handleInputChange = this.handleInputChange.bind(this); 
      this.handleSubmitForm = this.handleSubmitForm.bind(this) ;
  }
  handleInputChange(propObj){/***简单对象变化 */
     let newFormData = Object.assign({},this.state.formData,propObj) ;
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