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

        //这个地方确实比较精妙，这地方完全可以直接返回一个null,然后在TabContent中显示着部分内容，
        //这样TabPane的使命就是仅仅传送数据给TabNav和TabContent使用，
        //然而这里却返回了tabPane内容，所以精妙
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