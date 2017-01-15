function ItemRow(props){
    var className = props.completed ? 'item completed' : 'item' ;
    return $('<li>')
        .on('click',props.onUpdate.bind(null,props.id))
        .addClass(className)
        .attr('id',props.id)
        .html(props.text)  
}

function createElement(tag,attrs,children) {
    var elem = $(`<${tag}>`) ;
    for(var key in attrs){
        var val = attrs[key] ;
        if(key.indexOf('on') === 0){
            var event = key.substr(2).toLowerCase() ;
            elem.on(event,val) ;
        }else{
            elem.attr(key,val) ;
        }
    }
    return elem.html(children) ;
}

function ItemRow (props){
    var className = props.completed ? 'item completed ' : 'item' ;
    return createElement('li',{
        id:props.id,
        class:props.className,
        onClick:props.onUpdate.bind(null,props.id)
    },props.text) ;
}


function render(props,node){
    function updateState (toggleId){
        state.Items.forEach(function(el){
            if(el.id === toggleId){
                el.completed = !el.completed ;
            }
        }) ;
        store.setState(state) ;
    }
    node.empty().append(
        [ItemList({
            items:props.items,
            onUpdate:updateState
        })]
    ) ;
}
function extending(base,item){
    return $.extend({},item,base) ;
}

function ItemList(props){
    return createElement('ul',props.items.map(
        extending.bind(null,{
            onUpdate:props.onUpdate
    })).map(ItemRow)) ;
}


function SearchBar(props){
    function onButtonClick(e){
        var val = $('#input').val() ;
        $('#input').val('') ;
        props.update(val) ;
        e.preventDefault() ;
    }
    var input = createElement('input',{id:'input'}) ;
    var button = createElement('button',{
        id:'add',
        onClick:onButtonClick.bind(null)
    },'Add') ;
    return createElement('div',{},{input,button}) ;
}


function render(component,node){
    node.empty().append(component) ;
}
render(App(state),$('#app')) ;



function App (props){
    function updateSearchState(value){
        state.items.push({
            id:state.id ++ ,
            text:value,
            completed:false
        }) ;
    }
    function updateState (toggleId){
        state.item.forEach(function(item){
            if(item.id === toggleId){
                item.completed = !item.completed ;
            }            
        }) ;
        store.setState(state) ;
    }
    return [SearchBar({update:updateSearchState}),
        ItemList({items:props.items,onUpdate:updateState})
    ] ;
}


function App (props){
    function getInitialState(props){
        return {
            items:[],
            id:0
        } ;
    }
    var _state = getInitialState() ;
    var _node = null ;
    function setState(state){
        _state = state ;
        render() ;
    }
    //...
    function render(){
        var children = [
            SearchBar({
                update:updateSearchState
            }),
            ItemList({
                items:_state.items,
                onUpdate:updateState
            }) 
        ] ;
        if(!_node){
            return _node = createElement('div',{class:'top'},children) ;
        }else{
            return _node.html(children) ;
        }
    }
}


function render(component,node){
    node.empty().append(component) ;
}

render(App(),$('#app')) ;


var App = createClass({
    updateSearchState:function(){},
    updateState:function(){},
    render:function(){
        var children = [
            SearchBar({
                updateSearchState:this.updateSearchState
            }) ,
            ItemList({
                items:this.state.items,
                onUpdate:this.updateState
            })
        ] ;
        return createElement('div',{class:'top'},children) ;
    }
}) ;
