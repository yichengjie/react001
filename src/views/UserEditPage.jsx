'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SimpleEditForm from '../components/SimpleEditForm.jsx' ;
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api' ;
export default class UserEditPage extends Component{
  handleSubmitForm(formData){
     console.info('submit formData is : ', formData) ;
  }
  getEditFormSchema(){
    return Api.getEditFormSchema() ;
  }
  render(){
    return (
      <div>
        <SimpleEditForm 
          handleSubmitForm={this.handleSubmitForm}
          getEditFormSchema={this.getEditFormSchema}/>
      </div>
    ) ;
  }
}

