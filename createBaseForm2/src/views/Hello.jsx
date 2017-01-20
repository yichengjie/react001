import  React,{Component} from 'react'

class HelloComp extends Component{
    handleClick(event){
        event.preventDefault() ;
        var value = this.myInput.value ;
        console.info('username : ' + value) ;
        console.info('this.refs : ' ,this.myInput) ;
    }
    render(){
        console.info('disabled : ' ,this.props.disabled) ;
        return (
            <div data-xx ="123">
                <h1 >hello world</h1>
                <input type="text" ref ={input=>this.myInput = input}/>{' '}
                <button type="button" onClick={this.handleClick.bind(this)}>点击测试</button>
                { React.Children.map( this.props.children, (item,index)=>{
                    return React.cloneElement(item,{...item.props,key:index},item.props.children) ;
                    //return <p key ={index}> <em>{item.props.children}</em> </p>
                })}
            </div>
        )
    }
    
}

export default HelloComp