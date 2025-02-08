import React, { useState } from 'react'
import "./SignUpLogin.css"

function SignUpLogin() {


    const [signUpUser, setSignUpUser] = useState({
        name : "",
        email: "",
        password : "",
    });

    const [loginUser, setLoginUser] = useState({
        name : "",
        password : "",
    });


    console.log(signUpUser);
    console.log(loginUser);
    



  return (
    <div className='SignUpLogin'>
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

        <div className="wrapper">
        <form action="#">
            <h2>Sign Up</h2>
            <div className="input-field">

            <input type="text" onChange={(e)=>{
                setSignUpUser((p)=>{ 
                    return{...p,name:e.target.value}
                })
            }} required />

            <label>Enter your name</label>
            </div>
            <div className="input-field">
            <input type="text" onChange={(e)=>{
                setSignUpUser((p)=>{ 
                    return{...p,email:e.target.value}
                })
            }}  required />
            <label>Enter your email</label>
            </div>
            <div className="input-field">
            <input type="password" onChange={(e)=>{
                setSignUpUser((p)=>{ 
                    return{...p,password:e.target.value}
                })
            }} required />
            <label>Enter your password</label>
            </div>
            <button type="submit">Register</button>
            <div className="register">
            <p>
                have an account?
                <label className="orange" htmlFor="flip">Login now</label>
            </p>
            </div>
        </form>
        </div>

        <div className="wrapper">
        <form action="#">
            <h2>Login</h2>
            <div className="input-field">
            <input type="text" onChange={(e)=>{
                setLoginUser((p)=>{ 
                    return{...p,name:e.target.value}
                })
            }} required />
            <label>Enter your name</label>
            </div>
            <div className="input-field">
            <input type="password" onChange={(e)=>{
                setLoginUser((p)=>{ 
                    return{...p,password:e.target.value}
                })
            }} required />
            <label>Enter your password</label>
            </div>
            <div className="forget">
            <label htmlFor="remember">
                <input type="checkbox" id="remember" />
                <p>Remember me</p>
            </label>
            <a href="#">Forgot password?</a>
            </div>
            <button type="submit">Log In</button>
            <div className="register">
            <p>
                Don't have an account?
                <label className="orange" htmlFor="flip">Sigup now</label>
            </p>
            </div>
        </form>
        </div>
      
    </div>
  )
}

export default SignUpLogin
