import React ,{Component} from 'react' ;
//import Reform from '../reform/index.js' ;

class GettingStarted extends Component{
    state = {
        message:'',
        fileds:{
            email:'',
            password:''
        },
        errors:{}
    } ;
    validationRules = {
       email:{email:true,require:true},
       password:{require:true,minLength:6},
    } ;
    validationMessages = {
        require:(ruleKey,ruleValue,fieldName) => `${fieldName} is required`,
        email:(ruleKey,ruleValue,fieldName) =>` ${fieldName} must be a valid email`,
        default:(ruleKey,ruleValue,fieldName) => `${fieldName} is invalid`,
    } ;
    /**
     * Hook Reform into you component
     */
    validateFormFromState = Reform.reactHelpers.validateFormFromState ;
    formIsValid = Reform.reactHelpers.formIsValid ;
    fieldIfError = Reform.reactHelpers.fieldIfError ;
    mapFieldError = Reform.reactHelpers.mapFieldError ; 

    onChangeFactory =(fieldName) =>{
        return event =>{
            const value = event.target.value ;
            this.setState(state=>{
                state.message = '' ;
                state.fields[fieldName] = value ;
                state.errors = {} ;
                return state ;
            }) ;
        }
    }


    


}



