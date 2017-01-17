import  React,{Component} from 'react'

class HelloComp extends Component{
    handleClick(event){
        event.preventDefault() ;
        var tmp = "username" ;
        var value = this.refs[tmp].value ;
        console.info('username : ' + value) ;
        console.info('this.refs : ' ,this.refs) ;
    }
    render(){
        console.info('disabled : ' ,this.props.disabled) ;
        return (
            <div data-xx ="123">
                <h1 >hello world</h1>
                <input type="text" ref ="username"/>{' '}
                <button type="button" onClick={this.handleClick.bind(this)}>点击测试</button>
            </div>
        )
    }
    
}

export default HelloComp