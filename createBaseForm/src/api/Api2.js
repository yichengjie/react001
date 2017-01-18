export function getUserEditFormSchemaApi(){
    let formSchema =[{
            type:'text',
            label:'用户名',
            name:'username',
            rule:{required:true,validator:'validateUsername'},
        },
        {
            type:'email',
            label:'邮箱',
            name:'email',
            rule:{required:true,email:true} 
        },
        {
            type:'date',
            label:'生日',
            name:'birthday',
            rule:{required:true,date:true} 
        },
         {
            type:'text',
            label:'年龄',
            name:'age',
            rule:{integer:true} 
        },
        {
            type:'text',
            label:'地址',
            name:'addr',
            rule:{required:true}
        },
        {
            type:'select',
            label:'专业',
            name:'dept',
            options:[
                {name:'选择',value:''},
                {name:'java',value:'java'},
                {name:'javascript',value:'js'}
            ],
            rule:{required:true},
        },
        {
            type:'textarea',
            label:'描述',
            name:'descr',
            rule:{minLength:2}
        },
        ] ;

      return new Promise(function(resolve,reject){

          setTimeout(function(){
              resolve(formSchema) ;
          },200) ;

      }) ;
}