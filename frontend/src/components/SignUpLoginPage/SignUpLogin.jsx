// import React, { useState } from 'react'
// import "./SignUpLogin.css"

// function SignUpLogin() {


//     const [signUpUser, setSignUpUser] = useState({
//         name : "",
//         email: "",
//         password : "",
//     });

//     const [loginUser, setLoginUser] = useState({
//         name : "",
//         password : "",
//     });


//     console.log(signUpUser);
//     console.log(loginUser);
    



//   return (
//     <div className='SignUpLogin'>
//         <input type="checkbox" id="flip" />

//         <div className="cover">
//         <div className="front info-container">
//             <h1 id="info-title">Join Us!</h1>
//             <p id="info-message">
//             Sign up to create an account and explore our features.
//             </p>
//         </div>
//         <div className="back info-container">
//             <h1 id="info-title">Welcome Back!</h1>
//             <p id="info-message">
//             To stay connected, please login with your personal information.
//             </p>
//         </div>
//         </div>

//         <div className="wrapper">
//         <form action="#">
//             <h2>Sign Up</h2>
//             <div className="input-field">

//             <input type="text" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,name:e.target.value}
//                 })
//             }} required />

//             <label>Enter your name</label>
//             </div>
//             <div className="input-field">
//             <input type="text" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,email:e.target.value}
//                 })
//             }}  required />
//             <label>Enter your email</label>
//             </div>
//             <div className="input-field">
//             <input type="password" onChange={(e)=>{
//                 setSignUpUser((p)=>{ 
//                     return{...p,password:e.target.value}
//                 })
//             }} required />
//             <label>Enter your password</label>
//             </div>
//             <button type="submit">Register</button>
//             <div className="register">
//             <p>
//                 have an account?
//                 <label className="orange" htmlFor="flip">Login now</label>
//             </p>
//             </div>
//         </form>
//         </div>

//         <div className="wrapper">
//         <form action="#">
//             <h2>Login</h2>
//             <div className="input-field">
//             <input type="text" onChange={(e)=>{
//                 setLoginUser((p)=>{ 
//                     return{...p,name:e.target.value}
//                 })
//             }} required />
//             <label>Enter your name</label>
//             </div>
//             <div className="input-field">
//             <input type="password" onChange={(e)=>{
//                 setLoginUser((p)=>{ 
//                     return{...p,password:e.target.value}
//                 })
//             }} required />
//             <label>Enter your password</label>
//             </div>
//             <div className="forget">
//             <label htmlFor="remember">
//                 <input type="checkbox" id="remember" />
//                 <p>Remember me</p>
//             </label>
//             <a href="#">Forgot password?</a>
//             </div>
//             <button type="submit">Log In</button>
//             <div className="register">
//             <p>
//                 Don't have an account?
//                 <label className="orange" htmlFor="flip">Sigup now</label>
//             </p>
//             </div>
//         </form>
//         </div>
      
//     </div>
//   )
// }

// export default SignUpLogin


import React, { useContext, useState } from 'react';
import axios from 'axios';
import './SignUpLogin.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { axiosInstance } from '../../lib/axios';
import { ContextDef } from '../HomePage/contextDef';

import BtnLoader from '../utils/BtnLoader';

function SignUpLogin() {
  const navigate = useNavigate(); // Used to navigate after successful login/signup

  const {login,signup,isLoggingIn,isSigningUp} = useContext(ContextDef)

  const [signUpUser, setSignUpUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Handle Sign-Up Submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      const move = await signup(signUpUser);
      if(move) navigate('/home')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const move = await login(loginUser);
      if(move) navigate('/home')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
    <div className="SignUpLogin">
      <input type="checkbox" id="flip" />

      <div className="cover">
        <div className="front info-container">
          <h1 id="info-title">Join Us!</h1>
          <p id="info-message">
            Sign up to create an account and explore our features.
          </p>
        </div>
        <div className="back info-container">
          <h1 id="info-title">Welcome Back!</h1>
          <p id="info-message">
            To stay connected, please login with your personal information.
          </p>
        </div>
      </div>

      {/* Sign-Up Form */}
      <div className="wrapper">
        <form onSubmit={handleSignUpSubmit}>
          <h2>Sign Up</h2>
          <div className="input-field">
            <input
              type="text"
              onChange={(e) =>
                setSignUpUser({ ...signUpUser, name: e.target.value })
              }
              required
            />
            <label>Enter your name</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              onChange={(e) =>
                setSignUpUser({ ...signUpUser, email: e.target.value })
              }
              required
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              onChange={(e) =>
                setSignUpUser({ ...signUpUser, password: e.target.value })
              }
              required
            />
            <label>Enter your password</label>
          </div>
          <button type="submit" style={{display: 'flex',justifyContent: 'center',alignItems: 'center',}} >{isSigningUp ? (<BtnLoader/>) : "Register" }</button>
          <div className="register">
            <p>
              Have an account?
              <label className="orange" htmlFor="flip">
                Login now
              </label>
            </p>
          </div>
        </form>
      </div>

      {/* Login Form */}
      <div className="wrapper">
        <form onSubmit={handleLoginSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="email"
              onChange={(e) =>
                setLoginUser({ ...loginUser, email: e.target.value })
              }
              required
            />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              onChange={(e) =>
                setLoginUser({ ...loginUser, password: e.target.value })
              }
              required
            />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <label htmlFor="remember">
              <input type="checkbox" id="remember" />
              <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button style={{display: 'flex',justifyContent: 'center',alignItems: 'center',}} type="submit"> {isLoggingIn ? (<BtnLoader/>) : "Log In" }</button>
          <div className="register">
            <p>
              Don't have an account?
              <label className="orange" htmlFor="flip">
                Sign Up now
              </label>
            </p>
          </div>
        </form>
      </div>

      {/* Display error message if any */}
      
    </div>
    {errorMessage && <div className="error-message">{errorMessage}</div>}

    </>
  );
}

export default SignUpLogin;

