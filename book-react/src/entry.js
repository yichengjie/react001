
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import TabDemo from './components/tabs/App.jsx' ;
import MessageBox from './views/MessageBox.jsx' ;
let ShowView = TabDemo ;
ShowView = HelloComp ;
//ShowView = MessageBox ;


var title = '你好世界（来自props哦）';

let myapp = ReactDOM.render(
  <ShowView title={title} />,
  document.getElementById('app')
);

window.title = title ; 
window.myapp = myapp ;


