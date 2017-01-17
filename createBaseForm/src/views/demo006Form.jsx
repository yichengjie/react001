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
    handleSubmit(event){
        event.preventDefault() ;
        var {form} = this ;
        console.info('点击提交时页面上的表单数据 : ' , stringify(this.state.formData)) ;
        form.handleSubmit(function(flag){
            if(flag){
                console.info('表单验证通过，准备提交表单') ;
            }else{
                console.info('表单验证不通过,请检查 !' ) ;
            }
        }) ;
    }   
    handleChangeUsername(value){//自定义校验
        let addr = this.state.formData.addr || '' ;
        //console.info(this.state.formData) ;
        if(addr === '' && value == '123'){
            return  '地址为空时，用户名不能为123' ;
        }
        return '' ;
    }
    handleChangeAddr(value){//自定义校验
        let username = this.state.formData.username ;
        if(username==='123' && value === '456'){
            return '如果用户名为123，地址不能为456' ;
        }
        return '' ;
    }
}

export default createForm(MyForm) ;