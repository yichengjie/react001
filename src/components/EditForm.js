import React,{Component} from 'react' ;
import Chain,{nextFlagStr} from './chain.js'; 
export default class EditForm extends Component{
    constructor(props){
        super(props) ;
        this.state= {
            formSchema:{
                name:'editForm',
                fields:[
                    {label:'用户名',name:'userName',type:'text'},
                    {label:'密码',name:'password',type:'password'},
                    {label:'邮箱',name:'email',type:'email'},
                ]
            }
        } ;
    }
    render(){
        return (
           <form className="form-horizontal" role="form">
            <div className="form-group">
                <label  className="col-sm-2 control-label">用户名</label>
                <div className="col-sm-6">
                    <input type="email" className="form-control"  placeholder="Enter email"/>
                </div>
            </div>
        </form>
        ) ;
    } 
}

function renderFieldItem(fieldSchema){
    var fn1 = new Chain(renderSinpleInputField(fieldSchema)) ;
    var field =  fn1.passRequest() ;
    return (
        <div className="form-group">
           <label  className="col-sm-2 control-label">用户名</label>
           <div className="col-sm-6">
              {field} 
           </div>
        </div>
    ) ;
} 

function isSimpleInputField(type){
    let inputFieldTypeArr = ['text','email','number'] ;
    return inputFieldTypeArr.includes(inputFieldSchema.type)
}
function renderSinpleInputField(inputFieldSchema){
    if(isSimpleInputField(inputFieldSchema.type)){
        return (
            <input type={inputFieldSchema.type} className="form-control" /> 
        ) ;
    }
    return nextFlagStr ;
}