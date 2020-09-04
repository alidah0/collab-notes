import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Board from './components/Board';
import Join from './components/Join';
import './App.css';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/board" component={Board} />
      </Router>
    </div>
  );
}
export default App;
