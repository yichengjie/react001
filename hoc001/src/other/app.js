// var $ = require('jquery') ;
// var state = {value:null} ;
// $("#input").on('keyup',function(){
//     state.value = $(this).val().trim() ;
//     render() ;
// }) ;
// function render(){
//     $("#output").html(state.value) ;
// }
// render() ;

function output(text){
    return `<div>${text}</div>` ;
}

function h2(text){
    return `<h2>${text}</h2>` ;
}
function div(text){
    return `<div>${text}</div>` ;
}
function header(text){
    return div(h2(text)) ;
}

console.info(header('foo')) ;//<div><h2>foo</h2></div>



function createStore(initialState){
    var _state = initialState || {} ;
    var _listeners = [] ;
    function updateListeners(state){
        _listeners.forEach(function(listener){
            listener.cb(state) ;
        }) ;
    }
    return {
        setState:function(state){
            _state = state ;
            updateListeners(state) ;
        },
        getState:function(){
            return _state ;
        },
        onUpdate:function(name,cb){
            _listeners.push({name:name,cb:cb}) ;
        }
    } ;
}

var store = createStore(state) ;
store.onUpdate('rootRender',function(state){
    render(state,$("#list")) ;
}) ;

