const SHOW_ALL = "SHOW_ALL" ;
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" ;
const ADD_TODO = "ADD_TODO" ; 
const TOGGLE_TODO = "TOGGLE_TODO" ; 


const initialState = {
    visibilityFilter:SHOW_ALL,
    todos:[]
} ;

function todos(state = [] ,action){
    switch(action.type){
        case ADD_TODO :
            return [...state,{
                text:action.text,
                completed:false
            }] ;
        case TOGGLE_TODO :
            return state.map((todo,index) =>{
                if(index === action.index){
                    return Object.assign({},todo,{
                        completed:!todo.completed
                    }) ;
                }
                return todo ;
            }) ;
        default :
            return state ;
    }
}


function todoApp (state = initialState,action){
    switch(action.type){
        case SET_VISIBILITY_FILTER :
            return Object.assign({},state,{
                visibilityFilter:action.filter
            }) ;
        case ADD_TODO :
        case TOGGLE_TODO :
            return Object.assign({},state,{
                todos:todos(state.todos,action)
            }) ;
        default : 
        return state ;
    }
}

