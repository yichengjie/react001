var gLogNumber ,gIncreaseNumber,gSetNumber ;

function setupSomeGlobals(){
    //局部变量num最后会保存在闭包中
    var num = 42 ;
    //将一些对于函数的引用存储为全局变量
    gLogNumber = function(){
        console.info('gLogNumber : ' + num) ;
    }
    gIncreaseNumber = function(){
        num ++ ;
    }
    gSetNumber = function(x) {
        num = x ;
    }
}

setupSomeGlobals() ;
gIncreaseNumber() ;
gLogNumber() ;//43
gSetNumber(5) ;
gLogNumber() ;//5
var oldLog = gLogNumber ;
setupSomeGlobals() ;
gLogNumber() ;
oldLog() ;
