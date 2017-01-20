import React,{Component,PropTypes} from 'react' ;

class ScrollPane extends Component {
    static contextTypes = {
        registerPane:PropTypes.func.isRequired,
        unregisterPane:PropTypes.func.isRequired
    } ;

    componentDidMount() {
        this.context.registerPane(this.el) ;
    }

    componentWillUnmount() {
        this.context.unregisterPane(this.el) ;
    }

    render() {
        return (
            <div ref ={el=>this.el = el}>
                {this.props.children}
            </div>
        );
    }
}


class ScrollContainer extends Component {
    static childContextTypes = {
        registerPane:PropTypes.func,
        unregisterPane:PropTypes.func
    } ;
    panes = [] ;
    getChildContext (){
        return {
            registerPane:this.registerPane,
            unregisterPane:this.unregisterPane
        } ;
    }
   
    registerPane = (node)=>{
        if(!this.findPane(node)){
            this.addEvents(node) ;
            this.panes.push(node) ;
        }
    }
    unregisterPane = (node)=>{
        if(this.findPane(node)){
            this.removeEvents(node) ;
            let index = this.panes.indexOf(node) ;
            this.panes.splice(index,1) ;
        }
    }

    addEvents = (node) =>{
        node.onscroll = this.handlePaneScroll.bind(this,node)
    }
    removeEvents = (node) =>{
        node.onscroll = null ;
    }

    findPane = (node) => {
        return this.panes.find(pane => pane === node) ;
    }

    handlePaneScroll = (node) =>{
        window.requestAnimationFrame(()=>{
            this.panes.forEach(pane=>{
               // pane.scrollTop = ... 
            }) ;
        }) ;
    }
    render() {
        return (
            <div>
                <ScrollPane>
                    <ExpensiveComponent />
                </ScrollPane>
                <ScrollPane>
                    <ExpensiveComponent />
                </ScrollPane>
            </div>
        );
    }

}