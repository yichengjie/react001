var objs={ 
    setTheme(theme){
        console.log('setTheme1'); 
    }, 
    setTheme2(theme2){ 
        console.log('setThme2'); 
    } 
}; 
var objs1={ 
    setTheme(theme3){ 
        console.log('theme3')
    } 
}; 
var combine={}; //getownpropertydescriptor
Object.defineProperty(combine,'setTheme', Object.getOwnPropertyDescriptor(objs,'setTheme')) ;
Object.defineProperty(combine,'setTheme',Object.getOwnPropertyDescriptor(objs1,'setTheme')) ;

combine.setTheme('hello') ;