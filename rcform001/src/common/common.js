/**从后台formSchema定义中获取到formData的结构 */
export function getFormDataFromSchema(schemaFields){
    let obj = {} ;
    schemaFields.forEach(field=>{
        //console.info('field : ' + JSON.stringify(field)) ;
        let name = field['name'] ;
        obj[name] = '' ;
    }) ;
    return obj ;
}


function _replacer(key,value){
    if(typeof value === 'function' ){
        return `function ${value.name} () {...}` ;
    }
    return value ;
}

export function stringify(obj){
    return JSON.stringify(obj,_replacer,2) ;
}
