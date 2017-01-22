import React from 'react' ;

var MessageBox = React.createClass({
    getInitialState:function(){
        return {
            isVisible: true,
            subMessages:[
                '我会代码搬砖',
                '以及花式搬砖',
                '不说了，工头叫我回去搬砖了。。。。。。',
            ]
        }
    },
    render:function(){	

        return ( 
            <div>
                <h1>{this.props.title}</h1> 
                <Submessage messages={this.state.subMessages} />
            </div>
        )
    }
});

var Submessage = React.createClass({
    propTypes:{
        messages: React.PropTypes.array.isRequired,
    },
    getDefaultProps:function(){
        return {
            messages: ['默认的子消息'],
        }
    },
    render:function(){
        var msgs = [];
        this.props.messages.forEach(function(msg,index){
            msgs.push(
                <p>码农说： {msg}</p>
            )
        });

        return (
            <div>{msgs}</div>
        )
    }
});

export default MessageBox ;