import React,{Component} from 'react' ;
import PpHOC02 from '../components/PpHOC02.jsx' ;

class Example extends Component{
    handleSubmit(event){
        console.info('hello world ...') ;
    }
    render() {
        return (
            <div>
                <input type="text" {...this.props.name}/>
                <button type="button" onClick={this.handleSubmit}>提交</button>
            </div>
        );
    }
}
export default PpHOC02(Example) ;


