
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import TabDemo from './components/tabs/App.jsx' ;
import MessageBoxProps from './views/props.jsx' ;
import MessageBoxState from './views/states.jsx' ;
let ShowView = TabDemo ;
ShowView = HelloComp ;
//ShowView = MessageBoxProps ;
ShowView = MessageBoxState ;
//var title = '你好世界（来自props哦）';

let myapp = ReactDOM.render(
  <MessageBoxState />,
  document.getElementById('app')
);

window.myapp = myapp ;


