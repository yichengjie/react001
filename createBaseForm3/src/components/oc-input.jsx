import React,{Component} from 'react' ;

function OCInput({name,value,onChange}){
    return (
        <input className='form-control'  type="text"  
            name ={name} value={value} onChange={onChange}/> 
    ) ;
}

export default OCInput ;