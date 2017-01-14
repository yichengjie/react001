import React,{Component} from 'react' ;
//修改render方法输出的React组件
function iiHOC(WrappedComponent){
    return class Enhancer extends WrappedComponent{
        constructor(props){
            super(props) ;
            this.handleChange = this.handleChange.bind(this) ;
            this.state={} ;
        }
        handleChange(event){
            let target = event.target ;
            var name = target.name ;
            var value = target.value ;
            this.setState({[name]:value}) ;
            console.info('value : ' + event.target.value) ;
        }
        render(){
            const elementsTree = super.render() ;
            let newProps = {} ;
            let name = elementsTree.props.name ;
            if(elementsTree && elementsTree.type === 'input'){
                newProps = {
                    value:this.state[name] || 'my the force be with you ',
                    onChange:this.handleChange
                } ;
            }
            const props = Object.assign({},elementsTree.props,newProps) ;
            const newElementsTree = React.cloneElement(elementsTree,props,elementsTree.props.children) ;
            return newElementsTree ;
        } 
    }
}

export default iiHOC ;