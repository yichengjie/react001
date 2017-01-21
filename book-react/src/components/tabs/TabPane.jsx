import React,{Component,PropTypes} from 'react' ;
import classnames from 'classnames' ;
export default class TabPane extends Component {
    static propTypes = {
        tab:PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node
        ]).isRequired ,
        order:PropTypes.string.isRequired,
        disabled:PropTypes.bool,
        isActive:PropTypes.bool
    } ;
    render(){
        const {classPrefix,className,isActive,children}= this.props ;
        const classes = classnames({
            [className]:true,
            [`${classPrefix}-panel`] :true,
            [`${classPrefix}-active`]:isActive
        }) ;
        return (
            <div role="tabpanel"
                className={classes}
                aria-hidden={!isActive}
            >
            {children}
            </div>
        ) ;
    }
}