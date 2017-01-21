import React,{Component,PropTypes} from 'react' ;
import Tabs from './Tabs.jsx' ;
import TabPane from './TabPane.jsx' ;

export default  class App extends Component {
    render(){
        return (
            <Tabs classPrefix='tabs' 
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
        ) ;
    }
}