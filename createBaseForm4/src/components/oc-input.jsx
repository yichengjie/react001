import React,{Component} from 'react' ;

class OCInput extends Component {

    constructor(props){
        super(props) ;
        this.handleChange = this.handleChange.bind(this) ;
    }
    handleChange(event){
        var value = event.target.value ;
        this.props.onChange(value) ;
    }

    render(){
        let {name,value} = this.props ;
        return (
            <input className='form-control'  type="text"  
            name ={name} value={value} onChange={this.handleChange}/>    
        ) ;
    }
}

export default OCInput ;