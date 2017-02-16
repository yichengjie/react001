import {ADD_TODO,COMPLETE_TODO,SET_VISIBILITY_FILTER,SET_TODO_VALUE} from '../action-type.js' ;
/*
 * action 创建函数
 */
export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function setTodoValue(value){
  return { type: SET_TODO_VALUE, value}
}