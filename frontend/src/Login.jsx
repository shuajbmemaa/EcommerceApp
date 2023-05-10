import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
    const[values,setValues]=useState({
        email:'',
        password:''
    })

    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const navigate=useNavigate();
    axios.defaults.withCredentials=true

    useEffect(()=>{
        axios.get('http://localhost:8081')
        .then(res =>{
            if(res.data.valid){
                navigate('/')
            }else{
                navigate('/login')
            }
        })
        .catch(err=>console.log(err))
    },[])

    const handleSubmit=(event) =>{
        event.preventDefault();
        axios.post('http://localhost:8081/login',values)
        .then(res => {
            if(res.data.Login){
                navigate('/')
            }else{
                toast.error("Te dhenat nuk jane te plotesuara si duhen !",{position:toast.POSITION.TOP_RIGHT})
            }
        })
        .then(err => console.log(err))
    }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Shtyp Emailin tuaj' name='email'
                onChange={handleInput} className='form-control rounded-0'/>
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Shtyp passwordin tuaj' name='password'
                onChange={handleInput} className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
            <p>Pranoni termet tona</p>
            <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>

            </form>
        </div>
    </div>
  )
}

export default Login