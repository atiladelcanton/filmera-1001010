import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from "./components/Header";
import Home from "./components/pages/Home";

import Detail from "./components/pages/Detail";

const Routes = () =>{
    return (
        <BrowserRouter>
            <Header/>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/movie/:id" component={Detail} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;
