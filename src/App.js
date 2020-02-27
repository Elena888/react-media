import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Menu from './components/Menu'
import Articles from './components/Articles'
import ArticlesList from './components/ArticlesList'
import './App.scss';

function App() {
    return (
        <>
            <BrowserRouter>
                <Menu/>
                <Switch>
                    <Route path="/" exact component={Articles}/>
                    <Route path="/articles-list" exact component={ArticlesList}/>
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
