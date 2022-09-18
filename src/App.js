import React from 'react';
import './App.css';
import {Route,HashRouter as Router,} from 'react-router-dom'
import MapMain from "./pages/map/MapMain";



function App(){
  
  return (
      <Router>
        <Route path="/" component={MapMain}/>
      </Router>
  );
}

export default App;
