import React,{Component,PropTypes} from 'react' ;

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

    

}


