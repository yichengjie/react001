function sayAlice(){
    var say = function(){
        console.info(alice) ;
    }
    //局部变量最后保存在闭包中
    var alice = "Hello Alice" ;
    return say ;
}
sayAlice()() ;