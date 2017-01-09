import React,{Component} from 'react' ;
import Chain,{nextFlagStr} from './chain.js'; 
import Api from './Api' ;
export default class EditForm extends Component{
    constructor(props){
        super(props) ;
        this.state= {
            formSchema:{
                name:'',
                fields:[]
            },
            formData:{}
        } ;
    }
    componentDidMount(){
        let promise = Api.getEditFormSchema() ;
        promise.then((formSchema)=>{
            //console.info('formData  : ' + JSON.stringify(formData)) ;
            let formData = getFormData(formSchema) ;
            this.setState({formData}) ;
            //将formSchema放到state中
            this.setState({formSchema}) ;
        }) ;
    }
    handleChange(name,event){
        let formData = {[name]:event.target.value} ;
        let newFormData = Object.assign({},this.state.formData,formData) ;
        this.setState({formData:newFormData}) ;
    }
    handleSubmitForm(){
        console.info('formData : ' + JSON.stringify(this.state.formData)) ;

    }
    render(){
        let fields = this.state.formSchema.fields.map((field,index)=>{
            return renderFieldItem.call(this,field,index) ;
        }) ;
        let saveBtn = null ;
        if(fields.length>0){
            saveBtn = (<div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                    <button type="button" className="btn btn-default" onClick ={this.handleSubmitForm.bind(this)}>保存</button>
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
            {fn.call(this,fieldSchema.type,fieldSchema.name)} 
        </div>
        </div>
    ) ;
}

let fieldItemFactory={
    text:renderSimpleInputField,
    email:renderSimpleInputField,
    number:renderSimpleInputField,
    password:renderSimpleInputField,
    textarea:renderTextareaField
} ;
function renderSimpleInputField(type,name){
    return <input type={type} className="form-control" 
        value= {this.state.formData[name]} 
        onChange={this.handleChange.bind(this,name)} /> 
}
function renderTextareaField(name){
   return <textarea className ="form-control" 
        value={this.state.formData[name]}
        onChange={this.handleChange.bind(this,name)}/> 
}

// function renderFieldItem(fieldSchema,index){
//     let fn = fieldItemFactory[fieldSchema.type] ;
//     if(fn ===null || typeof fn !== 'function' ){
//         return null ;
//     }
//     return (
//         <div className="form-group" key ={index}>
//            <label  className="col-sm-2 control-label">{fieldSchema.label}</label>
//            <div className="col-sm-6">
//               {fn.call(this,fieldSchema.type,fieldSchema.name)} 
//            </div>
//         </div>
//     ) ;
// } 

// function renderSinpleInputField(type,name){
//     return <input type={type} className="form-control" 
//         value= {this.state.formData[name]} 
//         onChange={this.handleChange.bind(this,name)} /> 
// }

/**从后台formSchema定义中获取到formData */
function getFormData(formSchema){
    let obj = {} ;
    formSchema.fields.forEach(field=>{
        //console.info('field : ' + JSON.stringify(field)) ;
        let name = field['name'] ;
        obj[name] = '' ;
    }) ;
    return obj ;
}
