import  React,{Component} from 'react'

class HelloComp extends Component {

    constructor(props){
        super(props) ;
        this.state={
            name:'yicj',
            addr:'henan'
        };
    }
    getFieldProps(fieldName){
        return {
            value:this.state[fieldName],
            onChange:function(event){
                var value = event.target.value ;
                this.setState({[fieldName]:value}) ;
            }.bind(this)
        } ;
    }
    render(){
         return (
            <div>
                <h1>hello world props from top [test] : {this.props.test}</h1>
                <p><input type="text" {...this.getFieldProps('name')}/></p>
                <p><input type="text" {...this.getFieldProps('addr')}/></p>
                <p>-------------------------------------------------------</p>
                <SubComp  name={this.state.name} addr ={this.state.addr}/>
            </div>
        )
    }
}

class SubComp extends Component {

    componentWillReceiveProps (nextProps) {
        console.info('nextProps : ' , JSON.stringify(nextProps,null,2)) ;
    }

    render(){
        return (
            <div>
                <p>name:{this.props.name}</p>
                <p>addr:{this.props.addr}</p>
            </div>
        ) ;
    }
    
}



export default HelloComp