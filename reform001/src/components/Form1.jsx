import React,{Component} from 'react' ;
import Reform from '@franleplant/reform'; 
import {stringify} from '../common/common.js' ;

export default class Form1 extends Component{
    constructor(props){
        super(props) ;
        Reform.reactMixins.functionalMixin(this) ;
    }
    state ={
        fields:{
            name:'',
            email:'',
            password:'',
            confirmPassrod:''
        },
        errors:{}
    } ;
    validationRules = {
        name:{required:true,minLength:2},
        email:{email:true,required:true},
        password:{required:true,minLength:6},
        confirmPassrod:{
            required:true,
            mustMatch:(value)=>{/**这里一定要使用箭头函数绑定好this，否则this会丢失 */
                //true表示校验有问题
                if(value && value !== this.state.fields.password){
                    return true ;
                }
                return false;
            }
        }
    } ;
    validationMessages = {
        required:_ => 'Field is required',
        email:_ => 'Field must be a valid email' ,
        minLength: minLength => `Field must be at least ${minLength} long`,
        default:_ => 'Invalid field'
    } ;
   

    onChangeFactory(fieldName){
        return (event) =>{
            const value = event.target.value ;
            this.setState(state=>{
                state.fields[fieldName] = value ;
                return state; 
            }) ;
            this.validateField(fieldName,value) ;
        }
    }

    render(){
        //console.log(stringify(this.state)) ;
        let nameStyle = {
            border:!this.fieldIsValid('name') ? '2px solid red' : undefined
        } ;
       
       return (
         <form action="">
            <div>
                <p>Validate and if field is invalid the border will be red and an sigle error
                message displayed </p>
                <input type="text" value={this.state.fields.name}
                    onChange={this.onChangeFactory('name')} style={nameStyle} />
                <p>{!this.fieldIsValid('name') && 'Incorrect field ! Please do it right'}</p>
            </div>
            <div>
                <p>Validate and display on error per failed rule with array helper</p>
                <input type="email" value={this.state.fields.email} 
                    onChange={this.onChangeFactory('email')}/>
                <ul>
                    {
                      this.mapFieldErrors('email').map((message,index)=>{
                          <li key ={index}>{message}</li>
                      }) 
                    }                
                </ul>
            </div>
            <div>
                <p>Validate and display one error per fail rule with conditonal helper</p>
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
                <p>Validate and display one error per failed rule
                   with array helper withe specialcase</p>
                   <input type="password" value={this.state.fields.confirmPassrod}
                        onChange={this.onChangeFactory('confirmPassrod')}/>
                    <ul>
                        {
                            this.mapFieldErrors('confirmPassrod').map((message,index)=>{
                                <li key ={index}>{message}</li>
                            }) 
                        }
                    </ul>
            </div>
            <button type="button" disabled={!this.formIsValid()}>Submit</button>
         </form>  
       ) 

    } 

}