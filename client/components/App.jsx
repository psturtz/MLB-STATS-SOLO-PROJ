import React, { Component, useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Login from './Login.jsx';
import Home from './Home.jsx'
import Register from './Register.jsx';

const App = (props) => {
  let location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedIn ? (
            <Navigate replace to={'../home/'} />
          ) : (
            <Navigate replace to={'../login/'} />
          )
        }
      ></Route>
      <Route path="/login/" element={<Login login={setLoggedIn} />}></Route>
      <Route path="/home/" element={<Home />}></Route>
      <Route
        path="/register/"
        element={<Register login={setLoggedIn} />}
      ></Route>
    </Routes>
  ); 
};
export default App;
