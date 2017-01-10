'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import EditForm from './EditForm.js' ;
require('bootstrap/dist/css/bootstrap.css') ;

function g(){
  return <text></text>
}

ReactDOM.render(
  <EditForm/>,
  document.getElementById('app')
);