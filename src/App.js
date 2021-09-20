import React from 'react';
// import logo from './logo.svg';
import './App.css';
import {Route,BrowserRouter as Router} from 'react-router-dom';
import Layout from './core/components/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { router } from 'json-server';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route path='/' component={Layout}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
