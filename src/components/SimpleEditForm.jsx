import React,{Component} from 'react' ;

export default class SimpleEditForm extends Component{
    constructor(props){
        super(props) ;
        this.state= {
            schemaFields:[],
            formData:{}
        } ;
    }
    componentDidMount(){
        let promise = this.props.getEditFormSchema() ;
        promise.then((schemaFields)=>{
            console.info('schemafields  : ' + JSON.stringify(schemaFields)) ;
            let formData = getFormData(schemaFields) ;
            this.setState({formData}) ;
            //将formSchema放到state中
            this.setState({schemaFields}) ;
            //设置从后台查询过来的数据
            let newFormData = Object.assign({},this.state.formData);
            newFormData.dept = 'js' ;
            this.setState({formData:newFormData}) ;
        }) ;
    }

    handleChange(name,event){
        let propObj = {[name]:event.target.value} ;
        let newFormData = Object.assign({},this.state.formData,propObj) ;
        this.setState({formData:newFormData}) ;
    }
    handleSubmitForm(){
        //console.info('formData : ' + JSON.stringify(this.state.formData)) ;
        if(this.props.handleSubmitForm){
            this.props.handleSubmitForm(this.state.formData)
        }
    }
    render(){
        let fields = this.state.schemaFields.map((field,index)=>{
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
        value= {this.state.formData[name]} 
        onChange={this.handleChange.bind(this,name)} /> 
}
function renderTextareaField(fieldSchema){
   let {name} = fieldSchema ;
   return <textarea className ="form-control" 
        value={this.state.formData[name]}
        onChange={this.handleChange.bind(this,name)}/> 
}

function renderSelectField(fieldSchema){
   let {name,options} = fieldSchema ;
   let ops = options.map( (item,index)=>{
       return <option value={item.value} key ={index}>{item.name}</option>
   }) ;
   return (<select className ="form-control" 
        value={this.state.formData[name]}
        onChange={this.handleChange.bind(this,name)}>
            {ops}
        </select>
   )  
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
