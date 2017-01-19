import React,{Component} from 'react' ;

class OCCheckbox extends Component {
    render(){
        let {name,value,options} = this.props ;
        
        let arr = options.map((item,index) =>{
            return (
                <label key ={index}>
                    <input type="checkbox" value={item.value} 
                        checked={value.includes(item.value)} 
                        onChange ={this.props.onChange}/>{' ' + item.name}
                        &nbsp; &nbsp;
                </label>
            ) ;
        }) ;
        return (
            <div className="checkbox">
                {arr}
            </div>
        ) ;
    }
}

export default OCCheckbox ;