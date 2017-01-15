import React,{Component} from 'react' ;

// Prop Proxy with ref demonstration
function PPHOC (WrappedComponent){
    return class PP extends Component{
        constructor (props){
            super(props) ;
            this.state = {name:'test'} ;
            this.updateName = this.updateName.bind(this) ;
        }
        updateName(instance){
            console.info('---------------------------------------') ;
            console.info('instance.instanceName : ' +  instance.instanceName + ' ,state.name :  ' + this.state.name ) ;
            console.info('---------------------------------------') ;
            if(instance.instanceName !== this.state.name){
                this.setState({name:instance.instanceName}) ;
            }
        }
        render() {
            console.info('pp ref render ....') ;
            // Unless you really konw what you are doing ,dont trigger a state change
            // inside the render function ,this is just for teaching purposes
            const props = Object.assign({},this.props,{
                ref:this.updateName
            }) ;
            return (
                <div>
                   <h2>HOC Component</h2> 
                   <p>
                    The HOC component gets `instanceName` from the WrappedComponent 
                    instance via <br/>
                    `refs` and saves it in it’s own state:
                   </p>
                   <pre>{JSON.stringify(this.state,null,2)}</pre>
                   <WrappedComponent {...props}/> 
                </div>
            );
        }
    }
}



class Example extends Component{
    constructor(props){
        super(props) ;
        this.instanceName = 'yicj solo' ;
    }
    render(){
        return(
            <div>
                <h2>Wrapped Component</h2>
                <p>Props</p>
                <pre>{JSON.stringify(this.props,null,2)}</pre>
            </div>
        ) ;
    }
}

const EnhancedExample = PPHOC(Example) ;

const App =() =>{
    return <EnhancedExample date={(new Date).toISOString()} />
}

export default App ;