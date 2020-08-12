import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import TodoPage from './pages/TodoPage';

const App = () => (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={TodoPage} />
            </Switch>
        </div>
    </Router>
);

export default App;