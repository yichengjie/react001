import React,{Component} from 'react'  ;

export default class Demo006 extends Component{
    constructor(props){
        super(props) ;
        this.handleClick = this.handleClick.bind(this) ;
    }
    handleClick(event){
        let value = this.myInput.value ;
        console.info('hello world ... : ' + value) ;
    }
    render() {
        return (
            <div>
                <h2>hello world</h2>
                <input type="text" ref={(input)=>{this.myInput = input}} /><br/>
                <button type="button" onClick={this.handleClick}>保存</button>
            </div>
        );
    }
}
