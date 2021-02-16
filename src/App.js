import React from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import InvalidRoute from './components/InvalidRoute';
import FetchComponent from './components/FetchComponent';

class App extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/search/:searchText"
                        component={FetchComponent}/>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                    <Route path="/home"
                        component={FetchComponent}></Route>
                    <Route component={InvalidRoute}/>
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
