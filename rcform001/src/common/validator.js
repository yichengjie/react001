export default {
    required:function(value){
        if(value.length >0 ){
            return true ;
        }
        return false;
    },
    email:function(value){
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(myreg.test(value)){
            return true;      
        }
        return false;
    }
} ;