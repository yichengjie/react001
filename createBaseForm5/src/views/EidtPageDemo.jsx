import React,{Component} from 'react' ;
//import createForm from '../components/createBaseForm.jsx' ;
//import createForm from '../components/createBaseForm2.jsx' ;
import createForm from '../components/createBaseForm.jsx' ;
import {stringify} from '../common/common.js' ;
import {getUserEditFormSchemaApi} from '../api/Api.js' ;
import FormOperContainer from '../components/form-oper-container.jsx' ;

class MyEditPageDemo extends Component{
    //页面初始化时需要初始化页面参数请写在这里面
    initPageParam(){
        console.info('初始化页面参数...') ;
        //这里我们可能去查询后台，填充页面表单的数据。
        setTimeout(()=>{
            this.form.setFieldValue('birthday','2017-02-19') ;
        },1000) ;
    }

    //----------自定义特殊校验规则 start----------------------
    validateRange1(value,fieldName){
        return '自定义的范围校验不通过' ;
    }
    //----------自定义特殊校验规则 end------------------------

    //点击提交表单的处理函数
    handleSubmit = (event) => {
        var flag = this.form.validateForm() ;
        //console.info('点击提交时页面上的表单数据 : ' , stringify(this.state.formData)) ;
        if(flag){
            console.info('表单验证通过，准备提交表单') ;
        }else{
            console.info('表单验证不通过,请检查 !' ) ;
        }
    } 
    render(){
        return (
            <div>
                {this.renderBaseForm()}
                <FormOperContainer>
                    <button type="button" className="btn btn-default" onClick={this.handleSubmit}>提交</button>{'     '}
                    <button type="button" className="btn btn-danger" onClick={this.form.handleReset}>重置</button>
                </FormOperContainer>
            </div>
        )
    }
}




export default createForm(MyEditPageDemo,getUserEditFormSchemaApi) ;