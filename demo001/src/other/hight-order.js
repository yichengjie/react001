import React,{Component} from 'react' ;

function  PopupContainer (Wrapper){
    class WrapperComponent extends Component{
        constructor(props){
            super() ;
            this.state={
                count:1
            } ;
            //这里一定要绑定bind(this),否则handleClick中的this为null
            this.handleClick = this.handleClick.bind(this) ;
        }
        componentDidMount () {
            console.info('HOC did mount ') ;
            //最好要这样写，而不要在render中写`this.handleClick.bind(this)`
            //因为每次父组件render的时候都会执行一次bind(this)都会返回一个新的函数,
            //所以相当于prop发生了改变，这时子组件一定会重新render，即是使用immutable.js也无用。
            // var timer = setInterval(()=>{
            //     console.info('count : ' + this.state.count) ;
            //     if(this.state.count>=10){
            //         clearInterval(timer) ; 
            //         return ;
            //     }else{
            //         this.setState({count:this.state.count +1}) ;
            //     }
            // },1000) ;
        }
        componentWillUnmount() {
            console.info('HOC will unmount') ;
        }
        handleClick(){
            console.info('this : ' ,this) ;
            console.info('hello world') ;
        }
        render() {
            console.info('WrapperComponent render ....') ;
            return (
                <div>
                    <h1>hello world {this.state.count}</h1>
                    <Wrapper {...this.props} handleClick={this.handleClick} /> 
                </div>
            ) ;
                
        }
    }
    return WrapperComponent ;
}

class HelloComp extends Component {
    componentDidMount(){
        console.info(' [hello comp] componentDidMount ') ;
    }
    render() {
        console.info('hello comp render ....') ;
        return (
            <div>
                hello world
                <button type="button" onClick={this.props.handleClick}>click</button>
            </div>
        );
    }
}
let HelloContainer = PopupContainer(HelloComp) ;
export default HelloContainer ;




