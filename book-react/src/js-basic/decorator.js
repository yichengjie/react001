const {defineProperty,getOwnPropertyDescriptors} = Object;

// function getOwnPropertyDescriptors(mixin){

//     return null ;
// }

function handleClass(target,mixins){
    if(!mixins.length){
        throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`) ;
    }
    for(let i = 0,l = mixins.length ; i < l ; i ++){
        //获取mixins的attributes对象
        const descs = getOwnPropertyDescriptors(mixins[i]) ;
        //批量定义mixins的attributes对象
        for(const key in descs){
            //如果target中不存在同名的方法，则新加
            if( !(key in target.prototype) ){
                defineProperty(target.prototype,key,descs[key]) ;
            }
        }
    }
}

function mixin (...mixins){
    if(typeof mixins[0] === 'function'){
        return handleClass(mixins[0],[]) ;
    }else{
        return function(target) {
            return handleClass(target,mixins) ;
        }
    }
}


const PureRender = {
    shouldComponentUpdate(nextProps, nextState) {
        console.info('hello [shouldComponentUpdate(PureRender)] ') ;
    }
} ;

const Theme = {
    setTheme(){
        console.info('hello setTheme(Theme)') ;
    }
} ;


// eg:如下--------------------------
//@mixin(PureRender,Theme)
class MyComponent {
    shouldComponentUpdate(nextProps, nextState){
        console.info('hello [shouldComponentUpdate(MyComponent)]') ;

    }
}
mixin(PureRender,Theme)(MyComponent) ;
let myComponent = new MyComponent() ;

myComponent.shouldComponentUpdate() ;

myComponent.setTheme() ;
