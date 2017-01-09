export default {
    getEditFormSchema(){
        let schemaFields =  [
            {label:'用户名',name:'userName',type:'text'},
            {label:'密码',name:'password',type:'password'},
            {label:'邮箱',name:'email',type:'email'},
            {label:'描述',name:'addr',type:'textarea'},
        ];
        return new Promise(function(resolve,reject){
            resolve(schemaFields) ;
        }) ;
    }
} ;