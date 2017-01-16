import React,{Component} from 'react' ;
import validator from  '../common/validator.js'; 
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
            //this.handleCustomeValidate = this.handleCustomeValidate.bind(this) ;
        } 
        _inner_handleSubmit(callback){
            console.info('inner handleSubmit .... ') ;
            console.info('validationRules : ' +JSON.stringify(this.validationRules,null,2)) ;
            //进行校验
            let flag = false ;
            if(callback && (typeof callback === 'function')){
                callback.call(this,flag) ;
            }else{
                console.warn('请传入一个callback function') ;
            }
        }//this.handleCustomeValidate(
        _inner_onChangeFactory(fieldName,rules,validator){
            //[{ required: true, message: 'Please input your Password!' }]
           return (event) =>{
               const value = event.target.value ;
               var newFormData = Object.assign({},this.state.formData,{[fieldName]:value}) ;
               this.setState({
                    formData:newFormData
               }) ;
               //校验错误提示信息
               let errTip = getErrorTip(rules,value) ;
               //console.info('validator : ' ,validator)
               if(errTip.length==0 && validator && Object.prototype.toString.call(validator) === '[object String]' &&validator.length>0 ){
                   let validatorFn = this[validator] ;
                   errTip = validatorFn && validatorFn.call(this,value) || '' ;
               }
               this.setState(function(state){
                  state.formError[fieldName] = errTip ;
                  return state ;
               }) ;
           }
        }
        // customeValidateFactory(name){
        //     return function(value) {
        //         //console.info(`validator is call [${value}]...  `) ;
        //         return this[name].call(this,value) ;
        //     }
        // }
        render(){
            const treeNode = super.render() ;
            return treeNode ;
        }
    }
}



function getErrorTip(rules,value){
    let errTip = '' ;
    if(rules!=null&&rules.length>0){
        for(let rule of rules){
            let ruleName = getRuleKeyName(rule) ;
            let flag = validator[ruleName].call(null,value) ;
            if(!flag){
                errTip = rule.message ;
                break ;
            }
        }
    }
    return errTip ;
}


function getRuleKeyName (rule){
    // return Object.keys(rule).filter(function(keyName){
    //     return keyName !== 'message' ;
    // })[0] ;
    let {message,...other} = rule ;
    return Object.keys(other)[0] ; 
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
    return function (name,options={}){
        let {rules,validator} = options ;
        return {
            value:vvm.state.formData[name] || '',
            onChange:vvm._inner_onChangeFactory(name,rules,validator)
        }
    }
}
export default createForm ;

