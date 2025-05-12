import React, { useState } from 'react'
import {assets} from '../assets/assets'
import '../Styles/login.css'
import axios from 'axios';
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
const Login = () => {
    const [state,setState] = useState('SignUp');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate = useNavigate();
    const submitHandler = async(e)=>{
        e.preventDefault();
        if(state === 'SignUp'){
            try{
                const {data}= await axios.post('https://airbnb-clone-authentication.onrender.com/users/register',{name,email,password},{withCredentials:true});
                if(data.success){
                    toast.success(data.message);
                    navigate("/");
                }
                else{
                    toast.error(data.message);
                }
            }
            catch(error){
                toast.error(error.message);
            }
        }
        else{
            const {data} = await axios.post('https://airbnb-clone-authentication.onrender.com/users/login',{email,password},{withCredentials:true});
            try{
                if(data.success){
                    navigate("/");
                    toast.success(data.message);
                }
                else{
                    toast.error(data.message);
                }
            }
            catch(error){
                toast.error(error.message);
            }
        }
    }
  return (
    <div className='wrapper'>
    <div className='container'>
        <h1>{state === 'SignUp' ? 'Register' : 'Login'}</h1>
        <h2>{state === 'SignUp' ? 'Register to your Account' : 'Login to your Account'}</h2>
        {state === 'SignUp' && (
        <div className='name'>
            <img src={assets.person_icon} alt='name' />
            <input 
                onChange={e=>setName(e.target.value)} 
                value={name} type='text' 
                placeholder='Enter your name'/>
        </div>
        )}
        <div className='email'>
            <img src={assets.mail_icon} alt='email' />
            <input 
                onChange={e=>setEmail(e.target.value)}  
                value={email} type='email' 
                placeholder='Enter your email'/>
        </div>
        <div className='password'>
            <img src={assets.lock_icon} alt='password' />
            <input 
                onChange={e=>setPassword(e.target.value)} 
                value={password} type='password' 
                placeholder='Enter your password'/>
        </div>
        {state === 'Login' && (
            <span className='link' onClick={()=>{navigate("/resetPassword")}}>Forgot Password?</span>
        )}
        <button onClick={submitHandler}>Submit</button>
        {state === 'SignUp' ? 
         <p className="text-gray">Already have an account?{' '}
         <span className='link' onClick={()=>{setState('Login')}}>Login here</span>
         </p> 
        : 
        <p className="text-gray">Don't have an account?{' '}
            <span className='link' onClick={()=>{setState('SignUp')}}>Sign Up</span>
        </p>
        
        }
    </div>
    </div>
  )
}

export default Login
