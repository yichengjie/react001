export let validationFn = {
    required:function(value){
        if(value && value.trim().length >0 ){
            return true ;
        }
        return false;
    },
    email:function(value){
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(value && !(myreg.test(value))){
            return false;      
        }
        return true;
    },
    minLength:function(value,min){
       let numMin = parseInt(min,10) ;
       if(value && value.trim().length >= numMin){
          return true ;
       }
       return  false ;     
    }
} ;
export let validationMessages ={
    required:function(fieldName){
        return '必填字段' ;
    },
    email:function(fieldName){
        return '邮箱不合法' ;
    },
    minLength:function(fieldName,min){
        return `不能小于${min}个字符` ;
    }
} ;

// export default {
//   validationFn ,
//   validationMessages 
// } ;