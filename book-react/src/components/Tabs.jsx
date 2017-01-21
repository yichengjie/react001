import React,{Component,PropTypes} from 'react' ;
import classnames from 'classnames' ;

class Tabs extends Component {
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


class TabNav extends Component{
    static propTypes = {
        classPrefix:PropTypes.string,
        panels:PropTypes.node,
        activeIndex:PropTypes.number
    };
    getTabs(){
        const {panels,classPrefix,activeIndex} = this.props ;
        return React.Children.map(panels,(child)=>{
            if(!child){
                return ;
            }
            const order = parseInt(child.props.order,10) ;
            //利用class控制显示和隐藏
            let classes = classnames({
                [`${classPrefix}-tab`]:true,
                [`${classPrefix}-active`]:activeIndex === order,
                [`${classPrefix}-disabled`]:child.props.disabled
            }) ;
            let events = {} ;
            if(!child.props.disabled){
                events = {
                    onClick:this.props.onTabClick.bind(this,order)
                } ;
            }
            const ref = {} ;
            if(activeIndex === order){
                ref.ref = 'activeTab' ;
            }
            return (
                <li 
                  role="tab"
                  aril-disabled={this.props.disabled ? 'true' : 'false'}
                  aria-selected={activeIndex === order ? 'true' : 'false'}
                  {...event}
                  className={classes}
                  key={order}
                  {...ref}
                >
                </li>
            ) ;
        }) ;
    }

    render(){
        const {classPrefix} = this.props ;
        const rootClasses = classnames({
            [`${classPrefix}-bar`]:true
        }) ;
        const classes = classnames({
            [`${classPrefix}-nav`]:true
        }) ;

        return (
            <div className={rootClasses} role="tablist">
                <ul className={classes}>
                    {this.getTabs()}
                </ul>            
            </div>
        ) ;
    }
}

class TabContent extends Component {
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
            return React.cloneElement(child,{
                classPrefix,
                isActive,
                children:child.props.children,
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


class TabPane extends Component {
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
        const {classPrefix,className,isActive,child}= this.props ;
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


class App extends Component {
    render(){
        <Tabs
            classPrefix='tabs' 
            defaultActiveIndex={0} 
            className ="tabs-bar">
            <TabPane order="0"
                tab={<span><i className="fa fa-home"></i>&nbsp;home</span>}>
                第一个 Tab里的内容
            </TabPane>
            <TabPane order="1"
                tab={<span><i className="fa fa-book"></i>&nbsp;Library</span>}>
                第二个 Tab里的内容
            </TabPane>
            <TabPane order="0"
                tab={<span><i className="fa fa-pencial"></i>&nbsp;Application</span>}>
                第三个 Tab里的内容
            </TabPane>
        </Tabs>
    }
}

export default App ;





