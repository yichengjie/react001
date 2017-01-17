import React,{Component} from 'react' ;
import Reform from '@franleplant/reform' ;
export default class Form2 extends Component{
    constructor(props){
        super(props) ;
        Reform.reactMixins.functionalMixin(this) ;
    }
    state ={
        message:'',
        fields:{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        errors:{}
    } ;
    validationRules={
        name:{required:true,minLength:2},
        email:{email:true,required:true},
        password:{required:true,minLength:6},
        confirmPassword:{
            required:true,
            mustMatch:value=> value && value !==this.state.fields.password
        }
    } ;
    validationMessages ={
        required:_ => 'Field is required',
        email:_ =>'Field must be a valid email',
        minLength: _ => `Field must be at least ${minLength} long`,
        mustMatch: _ => 'Password must match' ,
        default: _ => 'Field is invalid'
    } ;

    onChangeFactory(fieldName){
        return (event) =>{
            const value = event.target.value ;
            this.setState(state=>{
                state.fields[fieldName] = value ;
                state.errors[fieldName] = {} ;
                return state ;
            }) ;
        }
    }

    onSubmit = (event) =>{
        event.preventDefault() ;
        const isValid = this.validateFormFromState() ;
        if(!isValid){
            this.setState({message:'Invalid Form'}) ;
            return  ;
        }
        this.setState({message:'Valid Form'}) ;
    }

    render(){
        console.info(this.state) ;
        return (
            <div>
                <form action="">
                    <div>
                        <p>Validate and if field is invalid the border 
                        will be red and an single error message displayed</p>
                        <input type="text" value={this.state.fields.name}
                        onChange={this.onChangeFactory('name')}/>
                        <ul>
                            {this.mapFieldErrors('name').map(function(message,index){
                               return (<li key={index}>{message}</li>)  ;
                            })}                        
                        </ul>
                    </div>

                    <div>
                        <p>Validate and display one error per failed rule with array helper</p>
                        <input type="email" value={this.state.fields.email}
                        onChange={this.onChangeFactory('email')}/>
                        <ul>
                            {this.mapFieldErrors('email').map(function(message,index){
                                return (<li key={index}>{message}</li>)  ;
                            })}
                        </ul>
                    </div>

                    <div>
                        <p>Validate and display one error per failed rule with conditional helper</p>
                        <input type="password" value={this.state.fields.password}
                        onChange={this.onChangeFactory('password')}/>
                        <ul>
                            {this.fieldIfError('password','required') &&
                            <li>Password is required</li>
                            }
                            {this.fieldIfError('password','minLength') && 
                             <li>Password must be at least 6 characters long</li>
                            }
                        </ul>
                    </div>

                    <div>
                        <p>Validate and display one error per failed rule with array helper with special case</p>
                        <input type="password" value={this.state.fields.confirmPassword}
                        onChange={this.onChangeFactory('confirmPassword')}/>
                        <ul>
                            {
                                this.mapFieldErrors('confirmPassword').map(function(message,index){
                                    return <li key ={index}>{message}</li>
                                }) 
                            }
                        </ul>
                    </div>
                    <p>{this.state.message}</p>
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
            </div>
        ) ;
    }

}