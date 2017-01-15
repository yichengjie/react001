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
        } 
        handleSubmit(event){
            console.info('formData : ' + JSON.stringify(this.state)) ;
        }
        handleChange(event){
            var value = event.target.value ;
            var name = event.target.name ;
            var newFormData = Object.assign({},this.state.formData,{[name]:value}) ;
            this.setState({
                formData:newFormData
            }) ;
        }
        render(){
            const newProps = Object.assign({},this.props,{form:this.form}) ;
            console.info('new props ' ,newProps) ;
            const treeNode = super.render() ;
            const newTreeNode = React.cloneElement(treeNode,newProps,treeNode.children) ;
            return newTreeNode ;
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
            onChange:vvm.handleChange
        }
    }
}
export default createForm ;

