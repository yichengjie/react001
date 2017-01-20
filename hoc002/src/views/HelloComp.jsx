import React,{Component} from 'react' ;
class HelloComp extends Component {

    constructor (props){
        super(props) ;
        this.formData = {
            username:'yicj'
        } ;
    }
    handleChange = (event)=>{
        var value = event.target.value ;
        this.formData.username = value ;
        console.info('this.formData.username : ' + this.formData.username) ;
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.handleChange} />
                <ChildComp username = {this.formData.username}/>
            </div>
        );
    }
}


class ChildComp  extends Component {
    render () {
        return (
            <div>
                <h2>hello in ChildComp</h2>
                <p>{this.props.username}</p>
            </div>
        )
    }
}

export default HelloComp ;