import visibilityFilter from './visibilityFilter.js' ;
import todos from './todos.js' ;

export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}