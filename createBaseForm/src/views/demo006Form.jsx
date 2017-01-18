import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm5.jsx' ;
import {stringify} from '../common/common.js' ;
import {getUserEditFormSchemaApi} from '../api/Api2.js' ;

class MyForm extends Component{
    //页面初始化时需要初始化页面参数请写在这里面
    initPageParam(){
        console.info('初始化页面参数...') ;
    }
    /**自定义特殊校验规则 */
    validateUsername(value,fieldName){
        console.info('username : ' + value) ;
        var email = this.state.formData.email ;
        if(email === '123' && value === '123'){
            return '当email为123时用户名不能为123' ;
        }
        return '' ;
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

export default createForm(MyForm,getUserEditFormSchemaApi) ;