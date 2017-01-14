import React,{Component} from 'react' ;

function ppHOC(WrappedComponent){
    return class PP extends Component{
        constructor (props){
            super(props) ;
            this.state = {
                name:''
            } ;
            this.onNameChange = this.onNameChange.bind(this) ;
        }
        onNameChange(event){
            this.setState({
                name:event.target.value
            }) ;
        }
        render(){
            const newProps = {
                name:{
                    value:this.state.name,
                    onChange:this.onNameChange
                }
            } ;
            return (
                <div>
                    {JSON.stringify(this.state)}
                    <br/>
                    <WrappedComponent {...this.props} {...newProps}/>
                </div>
            )
        }
    }
}
export default ppHOC ;

