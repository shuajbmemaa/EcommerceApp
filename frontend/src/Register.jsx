import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import './register.css'

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
    <div className='register-container'>
        <div className='register'>
        <h2 className="textS">Krijo llogarinë tënde</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
            <label htmlFor="emri" className="form-label-emri">
                  Emri:
                </label>
                <input type="text" placeholder='Emri' name='name'
               onChange={handleInput} className='form-control rounded-0 w-25 f1' />
            </div>
            <div className='mb-3'>
            <label htmlFor="email" className="form-label-email">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  className="form-control rounded-0 w-25 f2"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className=" form-label-password">
                Fjalëkalimi:
                </label>
                <input
                  type="password"
                  placeholder="Fjalëkalimi"
                  name="password"
                  value={values.password}
                  onChange={handleInput}
                  className="form-control rounded-0 w-25 f3 "
                />
              </div>
            <button type='submit' className='buttonR'>Regjistrohu</button>
            <p className="textP">ose</p>
            <Link to='/login' className='buttonK'>Kyçuni</Link>
        </form>
        </div>

    </div>
  )
}

export default Register