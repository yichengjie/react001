import React, { Component, PropTypes } from 'react'
import { connect } from '../react-redux/index.js' ;
import { addTodo, completeTodo, setVisibilityFilter} from '../redux/actions/index.js'
import { VisibilityFilters } from '../redux/action-type.js' ;

import AddTodo from '../containers/AddTodo.jsx'
import TodoList from '../containers/TodoList'
import Footer from '../containers/Footer'

class App extends Component {
  render() {
    //console.info(`App Component render method is call...`) ;
    return (
      <div>
        <AddTodo />
        <TodoList />
        <Footer />
      </div>
    )
  }
}
function mapStateToProps(state){
   return {
     todo:state.todo
   };
}
// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
//export default App
export default connect(mapStateToProps)(App) 