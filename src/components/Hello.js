import React,{Component} from 'react';
export default class Hello extends Component {
    render() {
        var span = <span data-a="1">VaJoy</span>;
        var newSpan = React.cloneElement(span, {'data-b':'2'}, <em>CNBlog</em>);
        console.log(newSpan.props);
        return <div>Hello {span},{newSpan}</div>; //Hello VaJoy,CNBlog
    }
} 