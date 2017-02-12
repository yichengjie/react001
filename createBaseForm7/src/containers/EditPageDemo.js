import { Component } from 'react';
import { connect } from 'react-redux';
import EditPageDemo from '../views/EidtPageDemo.jsx' ;

// 哪些 Redux 全局的 state 是我们组件想要通过 props 获取的？
function mapStateToProps(state) {
  return {
    value: state.counter
  };
}

// 哪些 action 创建函数是我们想要通过 props 获取的？
function mapDispatchToProps(dispatch) {
  return {
    onIncrement: () => dispatch(increment())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPageDemo);

