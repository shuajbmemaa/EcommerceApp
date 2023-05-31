import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'

const Register = () => {

    const [values,setValues]=useState({
        name:'',
        email:'',
        password:''
    })

    const handleInput=(event)=>{
        setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
    }

    const navigate=useNavigate();

    const handleSubmit=async(event) =>{
        event.preventDefault();
        axios.post('http://localhost:8081/register',values)
        .then(res => {
            console.log(res);
            navigate('/login')
            toast.warn('Ju lutem vazhdoni ne log in dhe prisni deri te merrni rolin tuaj')
        }) 
        .catch(err => console.log(err))
    }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
                <label htmlFor="name"><strong>Name</strong></label>
                <input type="text" placeholder='Shtyp Emrin tuaj' name='name'
               onChange={handleInput} className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
                <label htmlFor="email"><strong>E-maili</strong></label>
                <input type="email" placeholder='Shtyp emailin tuaj' name='email'
                onChange={handleInput} className='form-control rounded-0' />
            </div>
            <div className='mb-3'>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Shtyp passwordisn tuaj' name='password'
                onChange={handleInput} className='form-control rounded-0' />
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
            <p>You agree our terms and policies</p>
            <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log In</Link>
        </form>
        </div>

    </div>
  )
}

export default Register