'use strict';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
class Li extends Component {
    render(){
        return <li>{this.props.i}</li>
    }
}
class Ul extends Component {
    deal(child ,index){
         //注意下面这行换成 createElement 会报错！因为child是ReactElement而不是ReactClass或字符串
        return React.cloneElement(child,{i:index,key:index}) ;
    }
    render(){
        return <ul>{this.props.children.map(this.deal)}</ul>
    }
} 
class HelloMessage extends React.Component {
  render() {
    return (<Ul>
        <Li i="9" />
        <Li i="8" />
        <Li i="7" />
    </Ul>);
  }
}
class Hello extends Component {
    render() {
        var span = <span data-a="1">VaJoy</span>;
        var newSpan = React.cloneElement(span, {'data-b':'2'}, <em>CNBlog</em>);
        console.log(newSpan.props);
        return <div>Hello {span},{newSpan}</div>; //Hello VaJoy,CNBlog
    }
} 
ReactDOM.render(
  <Hello name="John" />,
  document.getElementById('app')
);