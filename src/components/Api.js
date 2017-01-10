export default {
    getEditFormSchema(){
        let schemaFields =  [
            {label:'用户名',name:'userName',type:'text'},
            {label:'密码',name:'password',type:'password'},
            {label:'邮箱',name:'email',type:'email'},
            {label:'描述',name:'addr',type:'textarea'},
            {label:'专业',name:'dept',type:'select',options:[
                {name:'选择',value:''},
                {name:'java',value:'java'},
                {name:'javascript',value:'js'}]
            }
        ];
        return new Promise(function(resolve,reject){
            resolve(schemaFields) ;
        }) ;
    }
} ;