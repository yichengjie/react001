'use strict'
function plus(num){
    var adder = function (){
        var _args = [] ;
        var _adder = function _adder(){
            [].push.apply(_args,[].slice.call(arguments)) ;
            return _adder ;
        } ;
        _adder.toString = function (){
            return _args.reduce(function(a,b){
                return a +b ;
            }) ;
        }
        return _adder ;
    }
    return adder()(num) ;
}
//这个和上面那个一样
function plus2(num){
    var adder = (function (){
        var _args = [] ;
        var _adder = function _adder(){
            _args.push([].slice.call(arguments)) ;
            //[].push.apply(_args,[].slice.call(arguments)) ;
            return _adder ;
        } ;
        _adder.toString = function (){
            return _args.reduce(function(a,b){
                return a +b ;
            }) ;
        }
        return _adder ;
    })(num) ;
    return adder ;
}


let sum = plus(1)(2)(3)(4) ;
let sum2 = plus(1)(2)(3)(4) ;

console.info('sum1 : ' + sum.toString()) ;
console.info('sum2 : ' + sum.toString()) ;