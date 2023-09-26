import { React, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import './signup.css';




const Auth_signup = () => {

    const navigate = useNavigate();


    const submit = () => {
      
         navigate('/admitOptions')

    }


    return (
        <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
        <div className='40-w p-5 rounded  bg-white' > 
         <form style={{backgroundColor:"white"}}>
        <h3 style={{backgroundColor:"white"}}>Log In</h3>
        <div className='mb-2'style={{backgroundColor:"white"}}>
            <input type="email" placeholder='Enter the email' className='form-control'></input>
        </div>
        <div className='mb-2' style={{backgroundColor:"white"}}>
            <input type="password" placeholder='Enter the password' className='form-control'></input>
        </div>
        <div className='mb-2' style={{backgroundColor:"white"}}>
            <input type="checkbox" className='custom-control custom-checkbox' id='check'/>
            <label htmlFor='check' className='custom-input-label ms-2' style={{backgroundColor:"white"}}>
                Remember Me
            </label>
        </div>
        <div className='d-grid' style={{backgroundColor:"white"}}>
            <button className='btn btn-primary' onClick={submit}>Proceed</button>
        </div>
        <p className='text-grid ' style={{backgroundColor:"white"}}>
            Forgot <a href='' style={{backgroundColor:"white"}}>Password</a>
        </p>
        </form>
        </div>
</div>
   
        
    )
}

export default Auth_signup