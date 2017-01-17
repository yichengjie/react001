import React,{Component} from 'react' ;
import Reform,{core} from '@franleplant/reform' ;
import {stringify} from '../common/common.js' ;

function assert(source,target){
    // if(Object.is(source,target)){
    //     console.info(stringify(source)) ;
    // }else{
    //     console.error(stringify(source)) ;
    // }
    console.warn(stringify(source)) ;
}


function demo001(){
    let validateField = core.validateField ;
    // a required empty value should be invalid.
    const fieldErrors = validateField('', {required: true});
    assert(fieldErrors, {required: true});

    // an invalid email value
    const fieldErrors2 = validateField('not an email', {email: true});
    assert(fieldErrors2, {email: true});
    // a valid email value
    const fieldErrors3 = validateField('email@domain.com', {email: true});
    assert(fieldErrors3, {email: false});

    // And of course you can combine them
    const fieldErrors4 = validateField('email@domain.com', {required: true, email: true});
    assert(fieldErrors4, {required: false, email: false});
}

export default class Demo001 extends Component{
    constructor(props){
        super(props) ;
    }
    render(){
        demo001() ;
         return (
            <div>
                <h2>Hello world </h2>
            </div>
         ) ;
    }
   
} 