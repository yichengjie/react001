'use strict';
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api.js' ;
import UserList from './UserList.jsx' ;

export default class UserEditPage extends Component{
  constructor(props){
      super() ;
      this.state={
          tableFields:[],
          list:[]
      } ;
  }
  componentDidMount() {
      let promise = Api.getUserListTableSchema() ;
      promise.then(tableFields=>{
          this.setState({tableFields}) ;
      }) ;
  }
  handleQueryOper(){
       let promise = Api.queryUserList() ;
       promise.then(list=>{
           this.setState({list}) ;
       }) ;
  }
  render(){
      return (
          <div>
            <button type="button" className="btn btn-primary" onClick={this.handleQueryOper.bind(this)}>查询</button>
            <br/>
            <UserList tableFields={this.state.tableFields} 
                list={this.state.list}/>
          </div>
      ) ;
  }
}

