import React,{Component} from 'react' ;
import Immutable from 'immutable' ; 

export default class SimpleEditForm extends Component{
    constructor(props){
        super(props) ;
        this.state={
            errorInfo:Immutable.Map({}),
        }
    }
    handleInputChange(name,event){
        let propObj = {[name]:event.target.value} ;
        this.props.handleInputChange(propObj) ;
        let newErrorInfo = this.state.errorInfo.set(name,'校验出错') ;
        this.setState({errorInfo:newErrorInfo}) ;
    }
    handleSubmitForm(){
        if( !(this.props.handleSubmitForm) ) return  ;
        //1.校验表单数据
        //...
        //2.准备提交表单
        let validFlag = this.isErrorInfoEmpty() ;
        if(validFlag){
            console.info('表单静态校验通过，准备提交表单!') ;  
            this.props.handleSubmitForm() ;
        }else{
            console.warn('表单静态校验没有通过,请修改!') ;
        }
    }
    isErrorInfoEmpty(){
        let values = Object.values(this.state.errorInfo) ;
        console.info('values : --- ' ,values) ;
        let flag = true ;
        values.forEach(err=>{
            if(err!=null&&err.length>0){
                flag = false ;
            }
        }) ;
        return flag ;
    }
    render(){
        if(this.props.schemaFields == null){
            return null ;
        }
        let fields = this.props.schemaFields.map((field,index)=>{
            return renderFieldItem.call(this,field,index) ;
        }) ;
        let saveBtn = null ;
        if(fields.size>0){
            saveBtn = (<div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="button" className="btn btn-default" 
                        onClick ={this.handleSubmitForm.bind(this)}>保存</button>
                </div>
              </div>) ;
        }
        return (
           <form className="form-horizontal" role="form">
              {fields}
              {saveBtn}
           </form>
        ) ;
    } 
}

function renderFieldItem(schemaField,index){
    let type = schemaField.get('type') ;
    let fn = fieldItemFactory[type] ;
    if(fn ===null || typeof fn !== 'function' ){
        return null ;
    }
    let form_groupClass = 'form-group ' ;
    let propName = schemaField.get('name') ;
    let errStr = this.state.errorInfo.get(propName) ;
    if(errStr != null && errStr.length > 0 ){
        form_groupClass += 'has-error' ;
    }
    return (
        <div className={form_groupClass}  key ={index}>
            <label  className="col-sm-2 control-label">{schemaField.get('label')}</label>
            <div className="col-sm-6">
                {fn.call(this,schemaField)} 
            </div>
            <div className="col-sm-2 error-tip">
                {this.state.errorInfo.get(propName)}
            </div>
        </div>
    ) ;
}

let fieldItemFactory={
    text:renderSimpleInputField,
    email:renderSimpleInputField,
    number:renderSimpleInputField,
    password:renderSimpleInputField,
    textarea:renderTextareaField,
    select:renderSelectField
} ;

function renderSimpleInputField(schemaField){
    let type = schemaField.get('type') ;
    let name = schemaField.get('name') ;
    return <input type={type} className="form-control" 
        value= {this.props.formData[name]} 
        onChange={this.handleInputChange.bind(this,name)} /> 
}
function renderTextareaField(schemaField){
   let name = schemaField.get('name') ;
   return <textarea className ="form-control" 
        value={this.props.formData[name]}
        onChange={this.handleInputChange.bind(this,name)}/> 
}

function renderSelectField(schemaField){
   let name = schemaField.get('name') ;
   let options = schemaField.get('options') ;
   let ops = options.map( (item,index)=>{
       return <option value={item.get('value')} 
                key ={index}>{item.get('name')}
              </option>
   }) ;
   return (<select className ="form-control" 
        value={this.props.formData.get(name)}
        onChange={this.handleInputChange.bind(this,name)}>
            {ops}
        </select>
   )  
}



