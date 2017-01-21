import React,{Component,PropTypes} from 'react' ;
import classnames from 'classnames' ;
export default  class TabContent extends Component {
    static propTypes ={
        classPrefix:PropTypes.string,
        panels:PropTypes.node,
        activeIndex:PropTypes.number,
        isActive:PropTypes.bool
    } ;
    getTabPanes(){
        const {classPrefix,activeIndex,panels,isActive} = this.props ;
        return React.Children.map(panels,(child)=>{
            if(!child){
                return ;
            }
            const order = parseInt(child.props.order,10) ;
            const isActive = activeIndex === order ;
            TabPane本来就会显示子内容
            return React.cloneElement(child,{
                classPrefix,
                isActive,
                children:child.props.children,/**这一个好像没太大的必要性 */
                key:`tabpane-${order}`
            }) ;
        }) ;
    }
    render(){
        const {classPrefix} = this.props ;
        const classes = classnames({
            [`${classPrefix}-content`]:true
        }) ;
        return (
            <div className={classes}>
                {this.getTabPanes()}
            </div>
        ) ;
    }
}
