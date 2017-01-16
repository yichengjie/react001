
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './components/HelloComp.jsx' ;
import Demo001 from './components/Demo001.jsx' ;
import Demo002 from './components/Demo002.jsx' ;


ReactDOM.render(
  <Demo002 />,
  document.getElementById('app')
);


