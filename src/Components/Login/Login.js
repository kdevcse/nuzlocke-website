import React from 'react';
import './Login.css';
import Input from '../Input/Input';
import LoginButton from './LoginButton';
//import {Link} from 'react-router-dom';

function Login() {
  return (
    <form className="LoginForm">
      <Input type='text' text='Email'/>
      <Input type='password' text='Password'/>
      <LoginButton text='Login2'></LoginButton>
    </form>
  );
}

export default Login;
