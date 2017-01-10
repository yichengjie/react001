'use strict';
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api.js' ;
import BaseEditPage from '../components/BaseEditPage.jsx' ;
import {getFormDataFromSchema} from '../common/common.js' ;
export default class UserEditPage extends BaseEditPage{
  constructor(props){
      super(props) ;
  }
  componentDidMount(){
      let promise = Api.getEditFormSchema() ;
      promise.then((schemaFields)=>{
          //console.info('schemafields  : ' + JSON.stringify(schemaFields)) ;
          let formData = getFormDataFromSchema(schemaFields) ;
          this.setState({formData}) ;
          //将formSchema放到state中
          this.setState({schemaFields}) ;
          //模拟从编辑页面从后台查询过来的数据，设置到表单上
          let newFormData = Object.assign({},this.state.formData);
          newFormData.dept = 'js' ;
          this.setState({formData:newFormData}) ;
      }) ;
  }
  handleSubmitForm(){
     console.info('submit formData is : ', this.state.formData) ;
  }
}

