
'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
//引入组件
import IIDebug from './components/ii_debug.jsx' ;
import PPBasic from './components/pp_basic.jsx' ;
import PPRef from './components/pp_ref.jsx' ;
import PPState from './components/pp_state.jsx' ;


ReactDOM.render(
  <PPState />,
  document.getElementById('app')
);


