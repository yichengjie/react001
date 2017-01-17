import React,{Component} from 'react' ;
function createForm (WrapperComponent){
    return class HOCComponent extends Component{
        constructor(props){
            super(props) ;
            this.state={
                formData:{},
                formError:{}
            } ;
            this.form = genForm(this) ;
            this.handleSubmit = this.handleSubmit.bind(this) ;
            this.form.handleSubmit = this.handleSubmit ;
        } 
        handleSubmit(event){
            console.info('formData : ' + JSON.stringify(this.state)) ;
        }
        render(){
           return (
                <div>
                    <WrapperComponent form={this.form}  {...this.props}/>
                </div>
           ) 
        }
    }
}
function genForm(vvm){
    return {
        getFieldProps:_fieldPropsFactory(vvm),
        getFieldError:_fieldErrorFactory(vvm)
    }
}
function _fieldErrorFactory(vvm){
    return function (name){
        return vvm.state.formError[name] || '' ;
    }
}
function _fieldPropsFactory(vvm){
    return function (name){
        return {
            value:vvm.state.formData[name] || '',
            onChange(event){
                var tmp = event.target.value ;
                var obj = {[name]:tmp} ;
                var newFormData = {...vvm.state.formData,...obj} ;
                vvm.setState({formData:newFormData}) ;
                var tmp2 = {[name]:'错误提示信息'} ;
                var newFormError = {...vvm.state.formError,...tmp2} ;
                vvm.setState({formError:newFormError}) ;
            }
        }
    }
}
export default createForm ;

