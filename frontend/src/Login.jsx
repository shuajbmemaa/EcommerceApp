import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './login.css'

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
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!values.email || !emailRegex.test(values.email)) {
          toast.error('Email i pavlefshëm!', { position: toast.POSITION.TOP_RIGHT });
          return;
        }
 
        
        axios.post('http://localhost:8081/login',values)
        .then(res => {
            if(res.data.Login){
                navigate('/')
            }else{
                toast.error("Të dhenat nuk janë plotësuar si duhet!",{position:toast.POSITION.TOP_RIGHT})
            }
        })
        .then(err => console.log(err))
    }

    

    return (
        <div className="login-container">
         
        <div className="login">
            <h2 className="textL">Hyni në llogarinë tuaj</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label-email">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                  className="form-control rounded-0 w-25 f1"
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
                  className="form-control rounded-0  w-25 f2 "
                />
              </div>
              <button type="submit" className="buttonL">
              Kyçuni
              </button>
              <p className="textP">ose</p>
              
              <Link
                to="/register"
                className="buttonC"
              >
               Regjistrohu
              </Link>
            </form>
            
          </div>
          
        </div>
      );
    };

export default Login