import React,{Component} from 'react' ;
import { createStore } from 'redux' ;
import { Provider } from 'react-redux' ;
import App from './containers/App' ;
import todoApp from './redux/reducers.js' ;


let store = createStore(todoApp) ;
class Index extends Component{
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Index ;

