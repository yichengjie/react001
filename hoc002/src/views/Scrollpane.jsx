import React,{Component} from 'react' ;

class ScrollPane extends Component {
    componentDidUpdate (prevProps, prevState) {
        this.el.scrollTop = this.props.scrollTop ;    
    }
    render() {
        return (
            <div ref ={(el) =>{this.el = el}}> </div>
        );
    }
}

class ScrollContainer extends Component {
    constructor(props){
        super(props) ;
        this.leftPane = null ;
        this.rightPane = null ;
        this.state = {
            leftPaneScollTop:0,
            rightPaneScollTop:0
        } ;
    }

    handleLeftScoll = (event) =>{
        //const leftPaneScollTop = ...
        //const rightPaneScollTop = ...
        this.setState({
            leftPaneScollTop,
            rightPaneScollTop
        }) ;
    }

    /**
     * 将滚动导读作为类成员属性就不会触发重渲染
     */
    handleScroll = (event) =>{
        //this.leftPaneScollTop = ...
       // this.rightPaneScollTop = ...
    }

    render () {
        return (
            <div>
                <ScrollPane
                    ref = {(el) =>{this.rightPane = el}}
                    onScroll = {this.handleScroll}
                    scrollTop = {ths.state.rightPaneScollTop}
                >
                    <ExpansiveComponent />
                </ScrollPane>
            </div>
        )
    }
}