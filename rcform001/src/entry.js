
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import Demo001 from './views/demo001.jsx' ;
//import Demo002 from './views/demo002.jsx' ;
import Demo003 from './views/demo003.jsx' ;

ReactDOM.render(
  <Demo001 />,
  document.getElementById('app')
);


