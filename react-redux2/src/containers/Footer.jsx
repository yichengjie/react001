import React, { Component, PropTypes } from 'react'
import Footer from '../components/Footer.js'
import { connect } from '../react-redux/index.js' ;
import {setVisibilityFilter} from '../redux/actions/index.js' ;


function mapStateToProps(state){
    return {
        filter: state.visibilityFilter,
        todo:state.todo
    } ;
}

function mapDispatchToProps(dispatch){
    return {
        onFilterChange:(nextFilter) =>  dispatch(setVisibilityFilter(nextFilter))
    } ;
}

export default connect(mapStateToProps,mapDispatchToProps)(Footer)
