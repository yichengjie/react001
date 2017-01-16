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
            this.handleSubmit = this.handleSubmit.bind(this) ;
            this.form.handleSubmit = this.handleSubmit ;
            this._inner_handleChange = this._inner_handleChange.bind(this) ;
        } 
        handleSubmit(event){
            console.info('formData : ' + JSON.stringify(this.state)) ;
        }
        _inner_handleChange(event){
            //console.info('handleChange this : ', this) ;
            var value = event.target.value ;
            var name = event.target.name ;
            var newFormData = Object.assign({},this.state.formData,{[name]:value}) ;
            this.setState({
                formData:newFormData
            }) ;
            //校验错误提示信息
            var newFormError = Object.assign({},this.state.formError,{[name]:'错误提示'}) ;
            this.setState({
                formError:newFormError
            }) ;
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
            name:name,
            value:vvm.state.formData[name] || '',
            onChange:vvm._inner_handleChange
        }
    }
}
export default createForm ;

