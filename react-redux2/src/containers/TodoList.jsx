import React, { Component, PropTypes } from 'react'
import TodoList from '../components/TodoList'
import { connect } from '../react-redux/index.js' ;
import {completeTodo} from '../redux/actions/index.js' ;
import {VisibilityFilters} from '../redux/action-type.js'; 



function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed)
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed)
  }
}


function mapStateToProps(state){
    return {
        todos: selectTodos(state.todos, state.visibilityFilter),
    } ;
}

function mapDispatchToProps(dispatch){
    return {
        onTodoClick:(index) => dispatch(completeTodo(index))
    } ;
}

export default connect(mapStateToProps,mapDispatchToProps)(TodoList)
