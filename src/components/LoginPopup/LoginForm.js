import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
function LoginForm() {

   const {url,setToken} = useContext(StoreContext)

    const [currState,setCurrState] = useState("Sign UP");
    const navigate = useNavigate()
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler = (event)=>{
     const name = event.target.name;
     const value = event.target.value;
     setData(data=>({...data,[name]:value}))
    }

    const onLogin = async (event) =>{
     event.preventDefault();
     let newUrl = url;
     if (currState ==="Login") {
        newUrl += '/api/user/login'
        
     }
     else{
        newUrl += '/api/user/register'
     }
     
     const response = await axios.post(newUrl,data);

     if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token);
        localStorage.setItem('email',data.email)
        // setShowLogin(false)
        navigate('/menu')
        
        
     }
     else{
        alert(response.data.message)
     }
    
    
    }

 
  return (
    <div className="login-popup">
        <form onSubmit={onLogin} action="" className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img  src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login"?<></>:  <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />      }
                <input name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Your Email' required />
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
            </div>
            <button type='submit'>{currState === "Sign UP"?"Create Account":"Login"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By containing, i agree to the terms of use and privacy policy</p>
            </div>
            {currState ==="Login"
            ?            <p>Create a new account? <span>Click Here</span></p>:''
            // :            <p>Already have and account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>

            }
        </form>
    </div>
)
}

export default LoginForm