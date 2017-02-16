import React, { Component, PropTypes } from 'react'
import AddTodo from '../components/AddTodo'
import { connect } from '../react-redux/index.js' ;
import {addTodo} from '../redux/actions/index.js' ;


function mapStateToProps(state){
    return {} ;
}

function mapDispatchToProps(dispatch){
    return {
        onAddClick:(text) => dispatch(addTodo(text)) 
    } ;
}

export default connect(mapStateToProps,mapDispatchToProps)(AddTodo)
