'use strict';
import React,{Component} from 'react';
import {stringify} from '../common/common.js' ;
//引入样式文件
import Api from '../api/Api.js' ;
import CreateBaseTable from '../components/createBaseTable.jsx' ;

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
  handleDeleteItem(item){
    console.info('---------->'  + stringify(item)) ;
  }
  handleEditItem(item){
      console.info('---------->'  + stringify(item)) ;
  }
  render(){
      return (
          <div>
            <button type="button" className="btn btn-primary" onClick={this.handleQueryOper.bind(this)}>查询</button>
            <br/>
            <CreateBaseTable tableFields={this.state.tableFields} list={this.state.list}>
                <i className="glyphicon glyphicon-trash" onClick={this.handleDeleteItem}></i>
                <i className="glyphicon glyphicon-pencil" onClick={this.handleEditItem}></i>
            </CreateBaseTable>
          </div>
      ) ;
  }
}

