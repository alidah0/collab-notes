import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Board from './components/Board';
import Join from './components/Join';
import NotFound from './components/NotFound';

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Join} />
          <Route path="/board" component={Board} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
