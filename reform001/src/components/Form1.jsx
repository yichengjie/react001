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
        error:{}
    } ;
    validationRules = {
        name:{required:true,minLength:2},
        email:{email:true,required:true},
        password:{required:true,minLength:6},
        confirmPassrod:{
            required:true,
            mustMatch:function(value){
                //true表示校验有问题
                if(value && value !== this.state.fields.password){
                    return true ;
                }
                return false;
            }
        }
    } ;
    validationMessage = {
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
        console.log(stringify(this.state)) ;
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
                <input type="password" value={}/>
            </div>

         </form>  
       ) 

    } 

}