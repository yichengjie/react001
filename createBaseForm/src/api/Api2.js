export function getUserEditFormSchemaApi(){
    let formSchema =[{
            type:'text',
            label:'用户名',
            name:'username',
            defaultValue:'yicj',
            rule:{required:true,validator:'validateUsername'},
        },
        {
            type:'email',
            label:'邮箱',
            name:'email',
            defaultValue:'',
            rule:{required:true,email:true} 
        },
        {
            type:'date',
            label:'生日',
            name:'birthday',
            defaultValue:'',
            rule:{required:true,date:true} 
        },
         {
            type:'text',
            label:'年龄',
            name:'age',
            defaultValue:'',
            rule:{integer:true} 
        },
        {
            type:'radio',
            label:'性别',
            name:'sex',
            defaultValue:'',
            rule:{required:true},
            options:[
              {name:'男',value:'1'},
              {name:'女',value:'2'}
            ]
        },
        {
            type:'checkbox',
            label:'喜欢的水果',
            name:'fruits',
            defaultValue:[],
            rule:{required:true},
            options:[
                {name:'苹果',value:'1'},
                {name:'橘子',value:'2'},
                {name:'橙子',value:'3'},
                {name:'香蕉',value:'4'}
            ]
        },
        {
            type:'select',
            label:'专业',
            name:'dept',
            defaultValue:'',
            rule:{required:true},
            options:[
                {name:'选择',value:''},
                {name:'java',value:'java'},
                {name:'javascript',value:'js'}
            ],
            
        },
        {
            type:'textarea',
            label:'描述',
            name:'descr',
            defaultValue:'',
            rule:{minLength:2}
        },
        ] ;

      return new Promise(function(resolve,reject){
        //   for(let i= 0 ; i< 20 ; i++){
        //       let tmp = (i+1) ;
        //       let obj = {
        //         type:'text',
        //         label:'用户名'+tmp,
        //         name:'username'+tmp,
        //         defaultValue:'yicj'+tmp,
        //         rule:{required:true,validator:'validateUsername'},
        //     }
        //     formSchema.splice(0,0,obj) ;
        //   }
          setTimeout(function(){
              resolve(formSchema) ;
          },200) ;

      }) ;
}