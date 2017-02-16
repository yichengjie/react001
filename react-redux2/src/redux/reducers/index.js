import visibilityFilter from './visibilityFilter.js' ;
import todos from './todos.js' ;
import todo from './todo.js' ;

export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action),
    todo:todo(state.todo,action)
  }
}