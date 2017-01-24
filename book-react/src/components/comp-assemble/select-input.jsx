import React,{Component} from 'react' ;

class SelectInput extends Component{
    static displayName = 'SelectInput' ;
    render() {
        const {selectItem,isActive,onClickHeader,placeholder} = this.props;
        const {text} =selectItem ;
        return (
            <div onClick={onClickHeader}>
                <input type="text"
                 disabled
                 value={text} 
                 placeholder={placeholder}/>
                 <Icon className={isActive} className="angle-down" />
            </div>
        );
    }
}