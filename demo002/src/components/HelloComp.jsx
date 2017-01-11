import React,{Component} from 'react' ;

export default class HelloComp extends Component{
    constructor(props){
        super(props) ;
        this.state = {} ;
        this.handleClick = this.handleClick.bind(this) ;
    }
    handleClick(){
        this.setState({count:1}) ;
    }
    render() {
        console.info(this.state) ;
        return (
            <div>
                <h1> hello world {this.state.count}</h1>
                <button type="button" onClick={this.handleClick}>test</button>
            </div>
        );
    }
}