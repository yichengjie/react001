import React, { Component, PropTypes } from 'react'
import AddTodo from '../components/AddTodo'
import { connect } from '../react-redux/index.js' ;
import {addTodo,setTodoValue} from '../redux/actions/index.js' ;


function mapStateToProps(state){
    return {
        todo:state.todo
    } ;
}

function mapDispatchToProps(dispatch){
    return {
        onAddClick:(text) => dispatch(addTodo(text)) ,
        setTodoValue:(value) => dispatch(setTodoValue(value))
    } ;
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTodo)
