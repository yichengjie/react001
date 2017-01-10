import React,{Component} from 'react' ;

export default class SimpleEditForm extends Component{
    handleInputChange(name,event){
        let propObj = {[name]:event.target.value} ;
        this.props.handleInputChange(propObj) ;
    }
    handleSubmitForm(){
        if(this.props.handleSubmitForm){
            this.props.handleSubmitForm()
        }
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
    return (
        <div className="form-group" key ={index}>
        <label  className="col-sm-2 control-label">{fieldSchema.label}</label>
        <div className="col-sm-6">
            {fn.call(this,fieldSchema)} 
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


