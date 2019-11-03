import React from 'react';
import './Login.css';
//import {Link} from 'react-router-dom';

function Login() {
  return (
    <form className="LoginForm">
      <label>Email</label>
      <input type="email"></input>
      <label>Password</label>
      <input type="password"></input>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Login;
