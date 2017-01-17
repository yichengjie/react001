
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
import Demo005Form from './views/demo005Form.jsx' ;
import Demo006Form from './views/Demo006Form.jsx' ;
import 'bootstrap/dist/css/bootstrap.css' ;
//disabled 这样的属性默认会被赋值为true
ReactDOM.render(
  <Demo006Form />,
  document.getElementById('app')
);


