'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import SimpleEditForm from '../components/SimpleEditForm.jsx' ;
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api.js' ;
export default class UserEditPage extends Component{
  constructor(props){
      super(props) ;
      this.state= {
          schemaFields:[],
          formData:{}
      } ;
      this.handleInputChange = this.handleInputChange.bind(this); 
      this.handleSubmitForm = this.handleSubmitForm.bind(this) ;
  }
  componentDidMount(){
      let promise = Api.getEditFormSchema() ;
      promise.then((schemaFields)=>{
          //console.info('schemafields  : ' + JSON.stringify(schemaFields)) ;
          let formData = getFormData(schemaFields) ;
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
/**从后台formSchema定义中获取到formData */
function getFormData(schemaFields){
    let obj = {} ;
    schemaFields.forEach(field=>{
        //console.info('field : ' + JSON.stringify(field)) ;
        let name = field['name'] ;
        obj[name] = '' ;
    }) ;
    return obj ;
}

