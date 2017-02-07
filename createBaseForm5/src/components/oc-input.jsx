import React,{Component} from 'react' ;

class OCInput extends Component {

    constructor(props){
        super(props) ;
        this.handleChange = this.handleChange.bind(this) ;
    }
    handleChange(event){
        var value = event.target.value ;
        this.props.handleChange(value) ;
        this.props.handleValidate(value) ;
    }

    render(){
        let {name,value} = this.props ;
        return (
            <input className='form-control'  type="text"  style={{width:this.props.width}}
            name ={name} value={value} onChange={this.handleChange}/>    
        ) ;
    }
}

export default OCInput ;