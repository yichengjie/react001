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
    }
}