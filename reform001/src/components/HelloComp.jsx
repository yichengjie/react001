import React,{Component} from 'react' ;



function replacer(key ,value){
    if(typeof value === 'function'){
        return `function ${value.name} (){....}` ;
    }
    return value ;
}

function stringify (obj){
    return JSON.stringify(obj,replacer,2) ;
}


class HelloComp extends Component{
    constructor(props){
        super(props) ;
        this.state ={
            username:''
        } ;
    }
    handleInputFactory(name){
        return (event) =>{
             var value = event.target.value ;
             //this.setState({[name]:value}) ;
             //下面这种方法也可以
             this.setState(state=>{
                 state[name] = value ;
                 return state ;
             }) ;
        }
    }

    handleSubmit = (event) =>{
        event.preventDefault() ;
        console.info('state : ' + stringify(this.state)) ;  
    }

    render(){
        return (
            <form action="">
                <input type="text" value={this.state.username} onInput={this.handleInputFactory('username')} />{' '}
                <button type="button" onClick={this.handleSubmit}>保存</button>
            </form>
        ) ;
    }
}

export default HelloComp ;