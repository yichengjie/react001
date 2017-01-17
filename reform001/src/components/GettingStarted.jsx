import React,{Component} from 'react' ;
import Reform from '@franleplant/reform' ;
//import Reform from '../reform/src/index.ts' ;
import {stringify} from '../common/common.js' ;

export default class GettingStarted extends Component{
    /**
     * Initialize you fields and error state
     */
    state = {
        message:'',
        fields:{
            email:'',
            password:''
        },
        errors:{}
    }

    /**
     * Declare validation rules for you fileds
     */
    validationRules = {
        email:{email:true,required:true},
        password:{required:true,minLength:6}
    }
    /**
     * [Optional] Easy way of displaying error message
     */
    validationMessages = {
        required(ruleKey,ruleValue,fieldName){
            return `${fieldName} is required` ;
        },
        email(ruleKey,ruleValue,fieldName) {
            return `${fieldName} must bu a valid email` ;
        },
        default(ruleKey,ruleValue,fieldName){
            return `${fieldName} is invalid`  ;
        }
    } ;

    

    /**
     * Hook Reform into your component
     */
    validateFormFromState = Reform.reactHelpers.validateFormFromState ;
    formIsValid = Reform.reactHelpers.formIsValid;
    fieldIfError = Reform.reactHelpers.fieldIfError ;
    mapFieldErrors = Reform.reactHelpers.mapFieldErrors ;

    /**
     * Regular onChange handlers form React world
     */
    onChangeFactory = function(fieldName){
        return event =>{
            const value = event.target.value ;
            this.setState(function(state){
                state.message = '' ;
                state.fields[fieldName] = value ;
                state.errors = {} ;
                return state ;
            }) ;
        }
    }
    /**
     * onSubmit handler
     */
    onSubmit = event =>{
        event.preventDefault() ;
        /**
         * This form will only validate onSubmit
         */
        const isValid = this.validateFormFromState() ;
        console.info(this.state) ;
        if(!isValid){
            this.setState({message:'Invalid Form'}) ;
            return ;
        }
        this.setState({message:'Valid Form'}) ;

       
    }
    render(){

       let state =  this.state ;
       console.info('render : ' , stringify(state)) ;

        return (
            <form action="">
                <div>
                    <input type="text" value={this.state.fields.email} 
                        onChange={this.onChangeFactory('email')}/>
                    <ul>
                        {
                            this.mapFieldErrors('email').map((message,index)=>{
                                return (<li key={index}>{message}</li>) ;
                            })
                        }
                    </ul>
                </div>

                <div>
                    <input type="text" value={this.state.fields.password}
                        onChange={this.onChangeFactory('password')}/>
                    <ul>
                        {this.fieldIfError('password','required')&&
                            <li>Password is required </li>
                        }
                        {this.fieldIfError('password','minLength')&&
                            <li>Password must be at least 6 characters long</li>
                        }
                    </ul>
                </div>
                <p>{this.state.message}</p>
                <button type="button" onClick={this.onSubmit}>Submit</button>
            </form>
        ) ;
    }


}