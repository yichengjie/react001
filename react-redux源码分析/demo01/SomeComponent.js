//SomeComponent.js
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActionCreators from './TodoActionCreators';
console.log(TodoActionCreators);
// {
//   addTodo: Function,
//   removeTodo: Function
// }
class TodoListContainer extends Component {
  componentDidMount() {
    // 由 react-redux 注入：
    let { dispatch } = this.props;
    // 注意：这样做行不通：
    // TodoActionCreators.addTodo('Use Redux');
    // 你只是调用了创建 action 的方法。
    // 你必须要 dispatch action 而已。
    // 这样做行得通：
    let action = TodoActionCreators.addTodo('Use Redux');
    dispatch(action);
  }

  render() {
    // 由 react-redux 注入：
    let { todos, dispatch } = this.props;
    // 这是应用 bindActionCreators 比较好的场景：
    // 在子组件里，可以完全不知道 Redux 的存在。
    let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);
    console.log(boundActionCreators);
    // {
    //   addTodo: Function,
    //   removeTodo: Function
    // }
    return (
      <TodoList todos={todos}
                {...boundActionCreators} />
    );

    // 一种可以替换 bindActionCreators 的做法是直接把 dispatch 函数
    // 和 action creators 当作 props 
    // 传递给子组件
    // return <TodoList todos={todos} dispatch={dispatch} />;
  }
}

export default connect(
  state => ({ todos: state.todos })
)(TodoListContainer)
