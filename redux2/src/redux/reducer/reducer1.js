/**
 * var state = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false
    }
  ]
} ;
 */

const SHOW_ALL = "SHOW_ALL" ;
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER" ;
const ADD_TODO = "ADD_TODO" ; 
const TOGGLE_TODO = "TOGGLE_TODO" ; 


const initialState = {
    visibilityFilter:SHOW_ALL,
    todos:[]
} ;

// function todoApp(state,action){
//     if(typeof state ==='undefined'){
//         return initialState ;
//     }
//     //这里不处理任何的action
//     //仅返回传入的state
//     return state ;
// }

function todoApp(state = initialState , action){
    switch(action.type){
        case SET_VISIBILITY_FILTER :
            return Object.assign({},state,{
                visibilityFilter:action.filter
            }) ;
        case ADD_TODO :
            return Object.assign({},state,{
                todos:[
                    ...state.todos,
                    {
                        text:action.text,
                        completed:false
                    }
                ]
            }) ;
        case TOGGLE_TODO :
            return Object.assign({},state,{
                todos:state.todos.map(function(todo,index){
                    if(index === action.index){
                        return Object.assign({},todo,{
                            completed:!todo.completed
                        }) ;
                    }
                    return todo ;
                }) 
            }) ; 
        default :
            return state ;
    }
}





