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
       const nameRegex =  /^[A-Za-z\s'-]{3,50}$/;
        if (!values.name || !nameRegex.test(values.name)) {
          toast.error('Ju lutem shkruani një emër të vlefshëm (të paktën 3 karaktere dhe pa numra)!', {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!values.email || !emailRegex.test(values.email)) {
          toast.error('Ju lutem shkruani një email të vlefshëm!', { position: toast.POSITION.TOP_RIGHT });
          return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!values.password || !passwordRegex.test(values.password)) {
          toast.error('Fjalëkalimi duhet të ketë të paktën 6 karaktere,1 shkronjë të madhe,1 shkronjë të vogël,1 simbol (@$!%*?&) dhe 1 numër!', { position: toast.POSITION.TOP_RIGHT });
          return;
        }
        
        axios.post('http://localhost:8081/register',values)
        .then(res => {
            console.log(res);
            navigate('/login')
            toast.warn('Pas disa minutave llogaria juaj do të jetë aktive!')
        }) 
        .catch(err => console.log(err))
    }


  return (
    <div className='register-container'>
        <div className='register'>
        <h2 className="textS">Krijo llogarinë tënde</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3a'>
            <label htmlFor="emri" className="form-label-emri">
                  Emri:
                </label>
                <input type="text" placeholder='Emri' name='name'
               onChange={handleInput} className='form-control rounded-0 w-25 f1' />
            </div>
            <div className='mb-3b'>
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
              <div className="mb-3c">
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