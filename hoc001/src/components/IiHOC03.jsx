import React,{Component} from 'react' ;

function IiHOC (WrappedComponent){
    return class II extends WrappedComponent{
        static displayName = `HOC(${getDisplayname(WrappedComponent)})`; 
        constructor(props){
            super(props) ;
        }
        render() {
            return (
                <div>
                    <h2>HOC Debugger Component</h2>
                    <p>Props</p> <pre>{JSON.stringify(this.props,null,2)}</pre>
                    <p>State</p> <pre>{JSON.stringify(this.state,null,2)}</pre>
                    {super.render()}
                </div>
            );
        }
    }
}

function getDisplayname(WrappedComponent){
    return WrappedComponent.displayName || 
    WrappedComponent.name ||
    'Component'
}


