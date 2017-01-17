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
            rule:{email:true} 
        },
        {
            type:'password',
            label:'地址',
            name:'addr',
            rule:{validator:'handleChangeAddr'}
        }] ;

      return new Promise(function(resolve,reject){

          setTimeout(function(){
              resolve(formSchema) ;
          },200) ;

      }) ;
}