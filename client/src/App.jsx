import React from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import {format} from 'timeago.js'
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import Login from './components/Login/Login'; 
import Register from './components/Register/Register';

import './app.css'
import Home from './Pages/Home/Home';
const App = () => {
   return(
     <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component ={Home} />
        </Switch>
     </Router>
   )
}

export default App
