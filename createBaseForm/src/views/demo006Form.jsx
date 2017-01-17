import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm5.jsx' ;
import {stringify} from '../common/common.js' ;
import {getUserEditFormSchemaApi} from '../api/Api2.js' ;

class MyForm extends Component{
    componentDidMount () {
        let promise = getUserEditFormSchemaApi() ;
        promise.then((retData)=>{
            this.setState({formSchema:retData}) ;
        }) ;
    }
    //整个函数必须被重写
    handleSubmit(flag){
        var {form} = this ;
        console.info('点击提交时页面上的表单数据 : ' , stringify(this.state.formData)) ;
        if(flag){
            console.info('表单验证通过，准备提交表单') ;
        }else{
            console.info('表单验证不通过,请检查 !' ) ;
        }
    }   
}

export default createForm(MyForm) ;