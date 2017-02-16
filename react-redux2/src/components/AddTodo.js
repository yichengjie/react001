import React, { Component, PropTypes } from 'react'

export default class AddTodo extends Component {
  render() {
    return (
      <div>
        <input type='text' value={this.props.todo} onChange={this.handleChange} />
        <button onClick={(e) => this.handleAddClick(e)}>
          Add
        </button>
      </div>
    )
  }

  handleChange =  (event) => {
    let value = event.target.value ;
    this.props.setTodoValue(value) ;
  }

  handleAddClick(e) {
    let text = this.props.todo ;
    this.props.onAddClick(text) ;
    this.props.setTodoValue('') ;
  }
}

AddTodo.propTypes = {
  onAddClick: PropTypes.func.isRequired
}