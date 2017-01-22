function buildList (list){
    var result = [] ;
    for(var i = 0 ; i < list.length ; i ++){
        var item = 'item' + i ;
        //var t = list[i] ;
        result.push(function(){
            console.info(item +' ' + list[i]) ;
            //console.info(item +' ' + t) ;
        }) ;
    }
    console.info('i end with : ' + i) ;
    return result ;
}

function testList (){
    var fnlist = buildList([1,2,3]) ;
    for(var j = 0 ; j < fnlist.length ; j++ ){
        fnlist[j]() ;
    }
}

testList() ;