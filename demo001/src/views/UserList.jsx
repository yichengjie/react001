import React,{Component} from 'react';

export default class UserList extends Component{
  render(){
      let titles = this.props.tableFields.map((item,index)=>{
          return <th key ={index}>{item.label}</th>
      }) ;
      let names = this.props.tableFields.map(item=>item.name) ;
      function renderTds (item,names){
          return names.map((name,index)=>{
              return <td key={index}>{item[name]}</td>
          }) ;
      }
      let trs = this.props.list.map((item,index)=>{
          return (
                <tr key={index}>
                   {renderTds(item,names)}
                   <td><i className="glyphicon glyphicon-trash"></i> </td>
                </tr>
          ) ;
      }) ;
      return (
          <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        {titles}
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {trs}
                </tbody>
            </table>
          </div>
      ) ;
  }
}