import React from 'react' ;

var MessageBox = React.createClass({
    getInitialState:function(){
        return {
            isVisible: true,
            titleMessage: '你好世界（来自state哦）',
        }
    },
    render:function(){	
        var styleObj={
            display: this.state.isVisible ? 'block' : 'none',
        }

        return ( 
            <div>
                <h1 style={styleObj}>{this.state.titleMessage}</h1> 
                <Submessage/>
            </div>
        )
    }
});

var Submessage = React.createClass({
    render:function(){
        return (
            <h3>写代码很有意思</h3>
        )
    }
});


export default MessageBox ;