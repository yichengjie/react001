
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
//import TabDemo from './components/tabs/App.jsx' ;
//import MessageBoxProps from './views/props.jsx' ;
//import MessageBoxState from './views/states.jsx' ;
//import CommentBox from './components/commentbox/comment-box.jsx' ;
let ShowView = HelloComp  ;
//ShowView = TabDemo ;
//ShowView = MessageBoxProps ;
//ShowView = MessageBoxState ;
//var title = '你好世界（来自props哦）';
//ShowView = CommentBox ;

let myapp = ReactDOM.render(
  <ShowView />,
  document.getElementById('app')
);

window.myapp = myapp ;


