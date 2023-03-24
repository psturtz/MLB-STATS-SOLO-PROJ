import React, { Component } from 'react';
import BatComp from './Bat.jsx';
import LoginBall from './LoginBall.jsx';

const Login = (props) => {


  return (
    <div className="flex flex-col place-items-center h-screen mx-auto w-40">
      <div className="-mb-32">
        <BatComp />
      </div>
      <div>
        <LoginBall login={props.login} />
      </div>

      <div className="-mt-32">
        <BatComp type="bottom" />
      </div>
    </div>
  );
};

export default Login;
