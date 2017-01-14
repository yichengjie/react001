export default {
    getUserEditFormSchema(){
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
    },
    getUserListTableSchema(){
        let tableFields = [
            {label:'姓名',name:'username'},
            {label:'专业',name:'dept'},
            {label:'邮箱',name:'email'},
            {label:'地址',name:'addr'},
        ] ;
        return new Promise(function(resolve,reject){
            resolve(tableFields) ;
        }) ;
    },
    queryUserList(){
        let list = [
            {username:'张三',dept:'计算机',email:'xx@qq.com',addr:'天津'},
            {username:'李四',dept:'物理',email:'xx@qq.com',addr:'北京'}
        ]
        return new Promise(function(resolve,reject){
            resolve(list) ;
        }) ;
    }
} ;