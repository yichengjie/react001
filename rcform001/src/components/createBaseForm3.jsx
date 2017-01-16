import React,{Component} from 'react' ;
function createForm (WrapperComponent){
    return class HOCComponent extends WrapperComponent{
        constructor(props){
            super(props) ;
            this.state={
                formData:{},
                formError:{}
            } ;
            this.form = genForm(this) ;
            this._inner_handleSubmit = this._inner_handleSubmit.bind(this) ;
            this.form.handleSubmit = this._inner_handleSubmit ;
            //this._inner_handleChange = this._inner_handleChange.bind(this) ;
        } 
        _inner_handleSubmit(callback){
            console.info('inner handleSubmit .... ') ;
            let flag = false ;
            if(callback && (typeof callback === 'function')){
                callback.call(this,flag) ;
            }else{
                console.warn('请传入一个callback function') ;
            }
        }
        onChangeFactory(fieldName){
           return (event) =>{
               const value = event.target.value ;
               var newFormData = Object.assign({},this.state.formData,{[fieldName]:value}) ;
               this.setState({
                    formData:newFormData
               }) ;
               //校验错误提示信息
                var newFormError = Object.assign({},this.state.formError,{[fieldName]:'错误提示'}) ;
                this.setState({
                    formError:newFormError
                }) ;
           }
        }
        render(){
            const treeNode = super.render() ;
            //const newProps = Object.assign({},.props,{form:this.form}) ;
            //console.info('newProps : ' ,newProps) ;
            //const newTreeNode = React.cloneElement(treeNode,newProps,treeNode.props.children) ;
            return treeNode ;
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
            onChange:vvm.onChangeFactory(name)
        }
    }
}
export default createForm ;

