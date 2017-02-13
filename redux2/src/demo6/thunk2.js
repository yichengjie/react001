var fs = require('fs');
var thunkify = require('thunkify');
var readFile = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFile('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFile('/etc/shells');
  console.log(r2.toString());
};


//手动执行上面这个 Generator 函数。
function demo01(){
    var g = gen();
    var r1 = g.next();
    r1.value(function(err, data){
        if (err) throw err;
        var r2 = g.next(data);
        r2.value(function(err, data){
            if (err) throw err;
            g.next(data);
        });
    });
}


function run(fn) {
    var gen = fn();
    function next(err, data) {
        var result = gen.next(data);
        if (result.done) return;
        result.value(next);
    }
    next();
}

function demo02(){
    run(gen);
}
