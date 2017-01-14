
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import HelloComp from './views/Hello.jsx' ;
import PpHOCDemo001 from './views/PpHOCDemo001.jsx' ;
import IiHOCDemo001 from './views/IiHOCDemo001.jsx' ;

// ReactDOM.render(
//   <IiHOCDemo001 />,
//   document.getElementById('app')
// );


ReactDOM.render({
  type:IiHOCDemo001
},document.getElementById('app')
);


