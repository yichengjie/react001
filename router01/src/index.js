
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router' ;
//引入组件
import HelloComp from './components/HelloComp.jsx' ;
import HelloComp2 from './components/HelloComp2.jsx' ;
//<HelloComp />
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={HelloComp}/>
    <Route path="/a" component={HelloComp2}/>
  </Router>,
  document.getElementById('app')
);