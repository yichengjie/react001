import React,{Component} from 'react' ;

function OCTextArea({name,value,onChange}){
    return (
        <textarea className='form-control' name={name} value={value} onChange={onChange} ></textarea>
    ) ;
}
export default OCTextArea ;