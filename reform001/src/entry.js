
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './components/HelloComp.jsx' ;
import Demo001 from './components/Demo001.jsx' ;
import Demo002 from './components/Demo002.jsx' ;
import GettingStarted from './components/GettingStarted.jsx' ;
import Form1 from './components/Form1.jsx' ;
import Form2 from './components/Form2.jsx' ;
import Portal001 from './components/Portal001.jsx' ;

ReactDOM.render(
  <Portal001 />,
  document.getElementById('app')
);


