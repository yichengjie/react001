'use strict';
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api.js' ;
import BaseEditPage from '../components/BaseEditPage.jsx' ;
import {getFormDataFromSchema} from '../common/common.js' ;
import Immutable from 'immutable' ;
export default class UserEditPage extends BaseEditPage{
  componentDidMount(){
      let promise = Api.getUserEditFormSchema() ;
      promise.then((schemaFields)=>{
          //console.info('schemafields  : ' + JSON.stringify(schemaFields)) ;
          let formData = getFormDataFromSchema(schemaFields) ;
          this.setState({formData:Immutable.Map(formData)}) ;
          //将formSchema放到state中
          this.setState({schemaFields:Immutable.fromJS(schemaFields)}) ;
          //模拟从编辑页面从后台查询过来的数据，设置到表单上
          let newFormData = this.state.formData.set('dept','js') ;
          this.setState({formData:newFormData}) ;
      }) ;
  }
  handleSubmitForm(){
     console.info('submit formData is : ', this.state.formData.toJS()) ;
  }
}

