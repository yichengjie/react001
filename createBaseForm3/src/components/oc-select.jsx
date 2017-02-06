import React,{Component} from 'react' ;

function OCSelect ({name,value,options,onChange}){
    return (
        <select className='form-control' name ={name} 
            value ={value} onChange={onChange}>
            {options.map(function(t,index){
                return <option value={t.value} key ={index}>{t.name}</option>
            })}
        </select>
    ) 
}


export default OCSelect ;