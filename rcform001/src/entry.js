
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import Demo001 from './views/demo001.jsx' ;
//import Demo002 from './views/demo002.jsx' ;
//import Demo003 from './views/demo003.jsx' ;
import Demo005 from './views/demo005.jsx' ;
import Demo006 from './views/demo006.jsx' ;
//disabled 这样的属性默认会被赋值为true
ReactDOM.render(
  <HelloComp  disabled  a="123"/>,
  document.getElementById('app')
);


