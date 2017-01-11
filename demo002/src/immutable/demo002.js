var Immutable,{Seq} =  require('immutable') ;
//update start-----------------------------------------------
function demo001(){
    var obj = {key: 'value',
        subObject: { subKey: 'subValue' }
    } ;
    const originMap = Immutable.Map(obj) ;
    const newMap = originMap.update(map=>{
        return Immutable.Map(map.get('subObject')) ;
    }) ;
    let newMapJs = newMap.toJS() ;
    console.info(newMapJs) ;//{ subKey: 'subValue' }
}
function demo002(){
    var obj = {key:'value'} ;
    const originMap = Immutable.Map(obj) ;
    const newMap = originMap.update('key',value=>{
        return value + value ;
    }) ;
    let newMapJs = newMap.toJS() ;
    console.info(newMapJs) ;//{ key: 'valuevalue' }
}
function demo003(){
    var obj = {key:'value'} ;
    const originMap = Immutable.Map(obj) ;
    let newMap = originMap.update('noKey','no value',value=>{
        return value + value ;
    }) ;
    let newMapJs = newMap.toJS() ;
    console.info(newMapJs) ;// { key: 'value', noKey: 'no valueno value' }
}

function demo004(){
    var obj = {key:'value'} ;
    const originMap = Immutable.Map(obj) ;
    newMap = originalMap.update('key', 'no value', value => {
        return value + value;
    });
    let newMapJs = newMap.toJS() ; 
    console.info(newMapJs) ;//  { key: 'valuevalue' }
}
//update end-----------------------------------------------
//merge start----------------------------------------------
function demo005(){
    var x = Immutable.Map({a: 10, b: 20, c: 30});
    var y = Immutable.Map({b: 40, a: 50, d: 60});
    x.merge(y) // { a: 50, b: 40, c: 30, d: 60 }
    y.merge(x) // { b: 20, a: 10, d: 60, c: 30 }
}
//mergeWith
function demo006(){
    var x = Immutable.Map({a: 10, b: 20, c: 30});
    var y = Immutable.Map({b: 40, a: 50, d: 60});
    x.mergeWith((prev, next) => prev / next, y) // { a: 0.2, b: 0.5, c: 30, d: 60 }
    y.mergeWith((prev, next) => prev / next, x) // { b: 2, a: 5, d: 60, c: 30 }
}
//mergeDeep
function demo007(){
    var x = Immutable.fromJS({a: { x: 10, y: 10 }, b: { x: 20, y: 50 } });
    var y = Immutable.fromJS({a: { x: 2 }, b: { y: 5 }, c: { z: 3 } });
    x.mergeDeep(y) // {a: { x: 2, y: 10 }, b: { x: 20, y: 5 }, c: { z: 3 } }
    var t = x.merge(y) ;
    console.info(t.toJS()) ;//{ a: { x: 2 }, b: { y: 5 }, c: { z: 3 } }
}
//merge end----------------------------------------------
//setIn start -------------------------------------------
function demo008(){
  var obj =  {
    subObject: {
        subKey: 'subvalue',
        subSubObject: {
            subSubKey: 'subSubValue'
        }
    }
  } ;
  const originalMap = Immutable.fromJS(obj) ;
  const newMap = originalMap.setIn(['subObject','subKey'],'ha ha!') ;
  console.info(newMap.toJS()) ;
  // {subObject:{subKey:'ha ha!', subSubObject:{subSubKey:'subSubValue'}}}
  const newerMap2 = originalMap.setIn(
    ['subObject', 'subSubObject', 'subSubKey'],
        'ha ha ha!');
   console.info(newerMap2.toJS()) ;
   //// {subObject:{subKey:'subvalue', subSubObject:{subSubKey:'ha ha ha!'}}}
}
//setIn end -------------------------------------------

//updateIn start --------------------------------------
function demo009(){
    var obj = { a: { b: { c: 10 } } } ;
    const originMap = Immutable.fromJS(obj) ;
    var newData = originMap.updateIn(['a','b','c'],val=>val*2) ;
    // { a: { b: { c: 20 } } }
}
function demo010(){
    var data1 = Immutable.fromJS({ a: { b: { c: 10 } } });
    var data2 = data1.updateIn(['x', 'y', 'z'], 100, val => val);
    var data3 = data1.updateIn(['a', 'b', 'z'],'',val=>val+'x') ;
    console.info(data2 === data1);//true
    console.info(data3 === data1) ;//false
    console.info(data3.toJS()) ;//{ a: { b: { c: 10, z: 'x' } } }
    console.info('--------------------------------') ;
    console.info(data3.toSeq().toJS()) ;
}
//updateIn end --------------------------------------
//map start-----------------------------------------
function demo011(){
    var obj = { a: 1, b: 2 };
    let data = Immutable.Seq(obj) ;
    console.info(data.toJS()) ;
    let t = data.map((val,key)=>10*val) ;
    console.info(t.toJS()) ;
}
//map end-----------------------------------------

//filter start------------------------------------
function demo012(){
    let data = Immutable.Seq({a:1,b:2,c:3,d:4}).filter(x => x % 2 === 0) ;
    console.info(data) ;
}
//filter end------------------------------------
//sort start -----------------------------------
function demo013(){//comparator(valueA, valueB):
    var obj = {c: 3, a: 1, b: 2} ;
    const data = Seq(obj).sort((a,b)=>{
        console.info('---> ' , a) ;
        if(a < b){
            return -1 ;
        }
        if(a > b){
            return 1 ;
        }
        if(a === b){
            return 0 ;
        }
    }) ;
    console.info(data.toJS()) ;
}
//sort end -----------------------------------

//groupBy start ------------------------------
function demo014(){
    var obj = [{v: 0}, {v: 1}, {v: 1}, {v: 0}, {v: 1}] ;
    const data = Immutable.fromJS(obj) ;
    data.groupBy(x=>x.get('v')) ;
    //// Map {0: [{v: 0},{v: 0}], 1: [{v: 1},{v: 1},{v: 1}]}
}
//groupBy end --------------------------------
demo013() ;
