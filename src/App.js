import React from 'react';
import './App.css';

import Navbar from './components/Navbar'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
      </Router>

    </div>
  );
}

export default App;
