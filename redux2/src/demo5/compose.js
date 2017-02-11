/**
 * 看起来逼格很高，实际运用其实是这样子的：
 * compose(f, g, h)(...arg) => f(g(h(...args)))
 * 值得注意的是，它用到了 reduceRight，因此执行顺序是从右到左
 * @param  {多个函数，用逗号隔开}
 * @return {函数}
 */
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  //return (...args) => rest.reduceRight((composed, f) => f(composed), last(...args))
  return function(...args){
     return rest.reduceRight(function(composed,f){
         return f(compose)
     },last(...arg)) ;
  }
}


function demo01(params) {
    
    
}


function demo02(params) {
    function func1(num) {
      console.log('func1 获得参数 ' + num);
      return num + 1;
    }
    function func2(num) {
        console.log('func2 获得参数 ' + num);
        return num + 2;
    }

    function func3(num) {
        console.log('func3 获得参数 ' + num);
        return num + 3;
    }
    // 有点难看（如果函数名再长一点，那屏幕就不够宽了）
    var re1 = func3(func2(func1(0)));
    console.log('re1：' + re1);
    console.log('===============');
    // 很优雅
    var re2 = Redux.compose(func3, func2, func1)(0);
    console.log('re2：' + re2); 

    /**
     *  func1 获得参数 0
        func2 获得参数 1
        func3 获得参数 3
        re1：6
        ===============
        func1 获得参数 0
        func2 获得参数 1
        func3 获得参数 3
        re2：6
     */
}

// 由于 reduce / reduceRight 仅仅是方向的不同，因此下面用 reduce 说明即可
// var arr = [1, 2, 3, 4, 5]
// var re1 = arr.reduce(function(total, i) {
//   return total + i
// })
// console.log(re1) // 15
// var re2 = arr.reduce(function(total, i) {
//   return total + i
// }, 100) // <---------------传入一个初始值
// console.log(re2) // 115