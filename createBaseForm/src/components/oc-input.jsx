import React,{Component} from 'react' ;

function OCINput({name,value,onChange}){
    return (
        <input className='form-control'  type="text"  
            name ={name} value={value} onChange={onChange}/> 
    ) ;
}

export default OCINput ;