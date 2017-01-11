'use strict';
import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css' ;
//引入样式文件
import '../styles/app.scss';
import Api from '../api/Api.js' ;
import UserList from './UserList.jsx' ;
import Immutable from 'immutable' ;


export default class UserEditPage extends Component{
  constructor(props){
      super() ;
      this.state={
          tableFields:Immutable.fromJS([]),
          list:Immutable.fromJS([])
      } ;
  }
  componentDidMount() {
      let promise = Api.getUserListTableSchema() ;
      promise.then(tableFields=>{
          let newData = this.state.tableFields.push(...tableFields)
          this.setState({tableFields:newData}) ;
      }) ;
  }
  handleQueryOper(){
       let promise = Api.queryUserList() ;
       //this.state.list.clear() ;
       promise.then(list=>{
          let newList = this.state.list.push(...list) ;
          console.info(newList.toJS()) ;
          this.setState({list:newList}) ;
          //this.setState({list}) ;
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

