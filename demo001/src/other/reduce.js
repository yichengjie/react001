function demo001(){
    var items = [10,120,1000] ;
    //do the job
    var total = items.reduce(function(sumSoFar,item){
        return sumSoFar + item ;
    },0) ;

    console.info('total : ' , total) ;
}

function demo002 (){
    var items = [10,120,1000] ;
    var total = items.reduce(function(sumSoFar,item){
        sumSoFar.sum = sumSoFar.sum + item ;
        return sumSoFar ;
    },{sum:0}) ;
    console.info('total : ' , total) ;
}

//demo001() ;
demo002() ;
