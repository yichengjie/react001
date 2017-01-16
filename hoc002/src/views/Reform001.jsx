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
    mapFieldErrors = Reform.reactHelpers.mapFieldErrors ; 
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
    onSubmit = (event) =>{
        event.preventDefault() ;
        const isValid = this.validateFormFromState() ;
        if(!isValid){
            this.setState({message:'Invalid Form'}) ;
            return ;
        }
        this.setState({message:'Valid Form'}) ;
    }
    render(){
        const emailErrors = this.mapFieldErrors('email')
        .map((message,index)=>{
            return (
                <li key ={index}>{message}</li>
            ) ;
        })  ;
        return (
            <form action="">
                <div>
                    <input type="email" value={this.state.fileds.email}
                        onChange={this.onChangeFactory('email')}/>
                    <ul>
                        {emailErrors}
                    </ul>
                </div>
                <div>
                    <input type="password" value={this.state.fields.password}
                     onChange={this.onChangeFactory('password')}/>
                     <ul>
                       {
                           this.fieldIfError('password','required')&&
                           <li>password is required</li>
                       }
                       {
                           this.fieldIfError('password','minLength') &&
                           <li>password must be at least 6 characters long</li>
                       }
                     </ul>
                </div>
                <p>{this.state.message}</p>
                <button type="button" onClick={this.onSubmit}>Submit</button>
            </form>
        ) ;
    }

}



