var Immutable = require('immutable') ;

function demo001(){
    var map1 = Immutable.Map({a:1,b:2,c:3}) ;
    var map2 = map1.set('b',50) ;
    var b1 = map1.get('b') ;
    var b2 = map2.get('b') ;
    console.info('b1 : ' + b1) ;
    console.info('b2 : ' + b2) ;
}

function demo002(){
    var map1 = Immutable.Map({a:1,b:2,c:3}) ;
    var map2 = map1.set('b',2) ;
    console.info( ' map1.equals(map2) : ' + map1.equals(map2)) ;
    var map3 = map1.set('b',50) ;
    console.info( 'map1.equals(map3) : ' + map1.equals(map3)) ;
}

function demo003(){
    var map1 = Immutable.Map({a:1, b:2, c:3});
    var clone = map1;
    console.info('map1 === clone : '+   (map1 === clone) ) ;
    console.info('map2 == clone : ' +  (map1 == clone) ) ;
    console.info('map1.equals(clone) : '+  (map1.equals(clone)) ) ;
}

function demo004(){
    var list1 = Immutable.List.of(1, 2);
    var list2 = list1.push(3, 4, 5);//1,2,3,4,5
    var list3 = list2.unshift(0);//0,1,2,3,4,5
    var list4 = list1.concat(list2, list3);//1,2,3,4,5-0,1,2,3,4,5
    console.info('list1.size : ' + list1.size);
    console.info('list2.size : ' + list2.size);
    console.info('list3.size : ' + list3.size);
    console.info('list4.size : ' + list4.size);
    console.info('list4.get(0) : ' + list4.get(0) );
}
function demo005(){
    var alpha = Immutable.Map({a:1, b:2, c:3, d:4});
    var t = alpha.map((v, k) => k.toUpperCase()).join();
    // 'A,B,C,D'
    console.info(t) ;
}

function demo006(){
    var map1 = Immutable.Map({a:1, b:2, c:3, d:4});
    var map2 = Immutable.Map({c:10, a:20, t:30});
    var obj = {d:100, o:200, g:300};
    var map3 = map1.merge(map2, obj);
    // Map { a: 20, b: 2, c: 10, d: 100, t: 30, o: 200, g: 300 }
    console.info(map3) ;
}

function demo007(){
    var myObject = {a:1,b:2,c:3} ;
    var t1 = Immutable.Seq(myObject) ;
    var t2 = t1.map(x => x * x) ;
    var t3 = t2.toObject() ;
    // { a: 1, b: 4, c: 9 }
    console.info('t1 : ' , t1) ;
    console.info('t2 : ' , t2) ;
    console.info('t3 : ' , t3) ;
}

function demo008(){
    var obj = { 1: "one" };
    Object.keys(obj); // [ "1" ]
    obj["1"]; // "one"
    obj[1];   // "one"
    
    var map = Immutable.fromJS(obj);
    map.get("1"); // "one"
    map.get(1);   // undefined
}

function demo009(){
    var deep = Immutable.Map({ a: 1, b: 2, c: Immutable.List.of(3, 4, 5) });
    var obj1 = deep.toObject() // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
    var obj2 = deep.toArray() // [ 1, 2, List [ 3, 4, 5 ] ]
    var obj3= deep.toJS() // { a: 1, b: 2, c: [ 3, 4, 5 ] }
    var obj4 = JSON.stringify(deep) // '{"a":1,"b":2,"c":[3,4,5]}'

    console.info('obj1 : ' ,obj1) ;
    console.info('obj2 : ' ,obj2) ;
    console.info('obj3 : ' ,obj3) ;
    console.info('obj4 : ' ,obj4) ;
}

function demo010(){
    var jsObj = {a:{b:{c:[3,4,5]}}} ;
    var nested = Immutable.fromJS(jsObj);
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }\
    var map1 = Immutable.Map(jsObj) ;
    console.info(map1) ;
    
}

function demo011(){

    var nested = Immutable.fromJS({a:{b:{c:[3,4,5]}}});
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ] } } }
    var nested2 = nested.mergeDeep({a:{b:{d:6}}});
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 6 } } }
    nested2.getIn(['a', 'b', 'd']); // 6
    var nested3 = nested2.updateIn(['a', 'b', 'd'], value => value + 1);
    // Map { a: Map { b: Map { c: List [ 3, 4, 5 ], d: 7 } } }
    var nested4 = nested3.updateIn(['a', 'b', 'c'], list => list.push(6));
    // Map { a: Map { b: Map { c: List [ 3, 4, 5, 6 ], d: 7 } } }
}


function demo012(){
    var oddSquares = Immutable.Seq.of(1,2,3,4,5,6,7,8)
    .filter(x => x % 2) ;
    console.info('oddSquares : ' ,oddSquares) ;// 1, 3, 5, 7
    oddSquares = oddSquares.map(x => x * x);
    console.info('oddSquares : ' ,oddSquares) ;// 1, 9, 25, 49
    console.log(oddSquares.get(1)); // 9
}

function demo013(){
    var map1 = Immutable.Map({a:1, b:1, c:1});
    var map2 = Immutable.Map({a:1, b:1, c:1});
    console.info(' map1 !== map2 : ' +  (map1 === map2) ); // two different instances   //false
    console.info('Immutable.is(map1, map2) : ' + Immutable.is(map1, map2)); // have equivalent values //true
    console.info('map1.equals(map2) : ' + map1.equals(map2)); // alternatively use the equals method //true
}

function demo014(){
    var list1 = Immutable.List.of(1,2,3);
    var list2 = list1.withMutations(function (list) {
        list.push(4).push(5).push(6);
    });
    console.info('list1.size : ' + list1.size); // 3
    console.info('list2.size : ' + list2.size ); // 6
}

demo013() ;