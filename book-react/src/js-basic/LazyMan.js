/**
 * 这个LazyMan有问题
 */

function _LazyMan(name) {
    this.tasks = [] ;
    var self = this ;
    var fn = (function(name){
        return function(){
            console.info(`Hi! This ${name}`) ;
            self.next() ;
        }
    })(name) ;

    this.tasks.push(fn) ;
    setTimeout(function() {
        fn() ;
    }, 0);
}

_LazyMan.prototype.next = function(){
    var fn = this.tasks.shift() ;
    fn && fn() ;
}


_LazyMan.prototype.eat = function (name){
    var self = this ;
    var fn = (function(name){
        console.info(`Eat ${name}`) ;
        self.next() ;
    })(name) ;
    this.tasks.push(fn) ;
    return this ;
}

_LazyMan.prototype.sleep = function (time){
    var self = this ;
    var fn = (function(time){
        return function (){
            setTimeout(function(){
                console.info(`Wake up after ${time}`) ;
                self.next() ;
            },time*1000) ;
        }
    })(time) ;
    this.tasks.push(fn) ;
    return this ;
}

function LazyMan (name) {
    return new _LazyMan(name) ;
}


function demo1(){
    LazyMan("Hank").eat("breakfast").sleep(1).eat("dinner").eat("dinner2") //输出
}

demo1() ;



