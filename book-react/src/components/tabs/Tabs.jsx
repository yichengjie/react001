import React,{Component,PropTypes} from 'react' ;
import classnames from 'classnames' ;
import TabNav from './TabNav.jsx' ;
import TabContent from './TabContent.jsx' ;


export default class Tabs extends Component {
    static propTypes = {
        className:PropTypes.string,
        classPrefix:PropTypes.string,
        children:PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.node),
            PropTypes.node
        ]),
        //默认激活索引,组件内更新
        defaultActiveIndex:PropTypes.number,
        //默认激活索引，组件外更新
        activeIndex:PropTypes.number,
        //切换回调函数
        onChange:PropTypes.func
    } ;
    
    static defaultProps = {
        classPrefix:'tabs',
        onChange:()=>{}
    } ;

    constructor(props){
        super(props) ;
        this.handleTabClick = this.handleTabClick.bind(this) ;
        const currProps = this.props ;
        let activeIndex ;
        //初始化activeIndex state
        if('activeIndex' in currProps){
            activeIndex = currProps.activeIndex ;
        }else if('defaultActiveIndex' in currProps){
            activeIndex = currProps.defaultActiveIndex ;
        }
        this.state = {
            activeIndex,
            prevIndex:activeIndex
        } ;
    }

    componentWillReceiveProps (nextProps) {
        if('activeIndex' in nextProps){
            this.setState({
                activeIndex:nextProps.activeIndex
            }) ;
        }
    }

    handleTabClick(activeIndex){
        const prevIndex = this.state.activeIndex ;
        //如果当前activeIndex与传入的activeIndex不一样
        //并且props中存在defaultActiveIndex时，则更新
        if(this.state.activeIndex !== activeIndex&&
            'defaultActiveIndex' in this.props){
            this.setState({
                activeIndex,
                prevIndex
            }) ;
            //更新后执行回调函数，跑出当前索引和上次索引
            this.props.onChange({activeIndex,prevIndex}) ;
        }
    }
    renderTabNav(){
        const {classPrefix,children} = this.props ;
        return (
            <TabNav
              key="tabBar"
              classPrefix={classPrefix}
              onTabClick={this.handleTabClick}
              panels={children}
              activeIndex={this.state.activeIndex}
            />
        ) ;
    }
    renderTabContent(){
        const {classPrefix,children} = this.props ;
        return (
            <TabContent
                key="tabcontent"
                classPrefix={classPrefix}
                panels={children}
                activeIndex={this.state.activeIndex}
             />
        ) ;
    }

    render(){
        const {className} = this.props ;
        const classes = classnames(className,'ui-tabs') ;
        return (
            <div className={classes}>
                {this.renderTabNav()}
                {this.renderTabContent()}
            </div>
        );
    }
}





