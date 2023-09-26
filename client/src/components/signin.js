import { React, useState } from 'react'
import axios from 'axios';
import './signup.css';
import { Link } from "react-router-dom";



const Auth_login = () => {





    return (
        <div className='auth__form-container'>

            <div className='auth__form-container_fields'>
  
                <div className='auth__form-container_fields-content'>
                    <p>Sign In</p>
                    <form onSubmit={()=>{}}>
                       
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='email'>Enter your email</label>
                            <input name='email' type='text' onChange={()=>{}} required />
                        </div>
                     
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Enter Password</label>
                            <input name='password' type='password' onChange={()=>{}} required />
                        </div>
                        <div className='auth__form-container_fields-content_button'>
                            <button>Sign In</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account' style={{color:"white"}}>
                        <p>
                           

                            Don't have an account?
                            
                            <span>
                               
                                <Link to='/' className="link-dark text-decoration-none" style={{textDecoration:"none",marginLeft:"5px"}}>
                                Sign Up
                            </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth_login;
