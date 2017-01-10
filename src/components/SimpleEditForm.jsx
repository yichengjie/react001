import React,{Component} from 'react' ;

export default class SimpleEditForm extends Component{
    constructor(props){
        super(props) ;
        this.state={
            errorInfo:{}
        }
    }
    handleInputChange(name,event){
        let propObj = {[name]:event.target.value} ;
        this.props.handleInputChange(propObj) ;
        let newErrorInfo = Object.assign({},this.state.errorInfo) ;
        newErrorInfo[name] = '校验出错' ;
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
        let flag = true ;
        values.forEach(err=>{
            if(err!=null&&err.length>0){
                flag = false ;
            }
        }) ;
        return flag ;
    }
    render(){
        let fields = this.props.schemaFields.map((field,index)=>{
            return renderFieldItem.call(this,field,index) ;
        }) ;
        let saveBtn = null ;
        if(fields.length>0){
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

function renderFieldItem(fieldSchema,index){
    let fn = fieldItemFactory[fieldSchema.type] ;
    if(fn ===null || typeof fn !== 'function' ){
        return null ;
    }
    let form_groupClass = 'form-group ' ;
    let errStr = this.state.errorInfo[fieldSchema.name] ;
    if(errStr != null && errStr.length > 0 ){
        form_groupClass += 'has-error' ;
    }
    return (
        <div className={form_groupClass}  key ={index}>
            <label  className="col-sm-2 control-label">{fieldSchema.label}</label>
            <div className="col-sm-6">
                {fn.call(this,fieldSchema)} 
            </div>
            <div className="col-sm-2 error-tip">
                {this.state.errorInfo[fieldSchema.name]}
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

function renderSimpleInputField(fieldSchema){
    let {type,name} = fieldSchema ;
    return <input type={type} className="form-control" 
        value= {this.props.formData[name]} 
        onChange={this.handleInputChange.bind(this,name)} /> 
}
function renderTextareaField(fieldSchema){
   let {name} = fieldSchema ;
   return <textarea className ="form-control" 
        value={this.props.formData[name]}
        onChange={this.handleInputChange.bind(this,name)}/> 
}

function renderSelectField(fieldSchema){
   let {name,options} = fieldSchema ;
   let ops = options.map( (item,index)=>{
       return <option value={item.value} key ={index}>{item.name}</option>
   }) ;
   return (<select className ="form-control" 
        value={this.props.formData[name]}
        onChange={this.handleInputChange.bind(this,name)}>
            {ops}
        </select>
   )  
}



