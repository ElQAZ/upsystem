import React from 'react';
import { Route, Switch } from "react-router-dom";
import Items from "./containers/Items/Items";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Items} />
        </Switch>
    );
};

export default Routes;