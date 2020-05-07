import React from 'react';
import './App.css';

import AdminDashboard from './AdminDashboard'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AdminDashboard></AdminDashboard>
      </Router>

    </div>
  );
}

export default App;
