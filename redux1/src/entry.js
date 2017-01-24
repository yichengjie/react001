
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
//import HelloComp from './views/Hello.jsx' ;
import Todo from './todo/index.jsx' ;

ReactDOM.render(
  <Todo />,
  document.getElementById('app')
);


