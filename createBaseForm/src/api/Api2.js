export function getUserEditFormSchemaApi(){
    let formSchema =[{
            type:'text',
            label:'用户名',
            name:'username',
            rule:{required:true,validator:'handleChangeUsername'},
        },
        {
            type:'email',
            label:'邮箱',
            name:'email',
            rule:{required:true,email:true} 
        },
        {
            type:'email',
            label:'邮箱2',
            name:'email2',
            rule:{required:true,email:true} 
        },
         {
            type:'email',
            label:'邮箱3',
            name:'email3',
            rule:{required:true,email:true} 
        },
        {
            type:'text',
            label:'地址',
            name:'addr',
            rule:{validator:'handleChangeAddr'}
        },
        {
            type:'text',
            label:'地址2',
            name:'addr2',
            rule:{minLength:2}
        },
        {
            type:'text',
            label:'地址3',
            name:'addr3',
            rule:{minLength:2}
        },
        {
            type:'text',
            label:'地址4',
            name:'addr4',
            rule:{minLength:2}
        }] ;

      return new Promise(function(resolve,reject){

          setTimeout(function(){
              resolve(formSchema) ;
          },200) ;

      }) ;
}