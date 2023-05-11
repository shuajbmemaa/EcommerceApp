import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditKategori = () => {
    const[data,setData]=useState({
        name:'',
        description:''
    })

    const navigate=useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:8081/getKategori/'+id)
        .then(res => {
            setData({...data,
                name:res.data.Result[0].name,
                description:res.data.Result[0].description
            })
        })
        .catch(err => console.log(err))
    },[])
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/updateKategori/'+id,data)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/kategorite')
        }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
          <h2>Update Category</h2>
          <form className='row g-3 w-50' onSubmit={handleSubmit}>
            <div className='col-12'>
              <label htmlFor='inputName' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='inputName'
                placeholder='Enter Name'
                autoComplete='off'
                onChange={e => setData({ ...data, name: e.target.value })}
                value={data.name}
              />
            </div>
            <div className='col-12'>
              <label htmlFor='inputDescription' className='form-label'>
                Description
              </label>
              <input
                type='text'
                className='form-control'
                id='inputDescription'
                placeholder='Enter Description'
                autoComplete='off'
                onChange={e =>
                  setData({ ...data, description: e.target.value })
                }
                value={data.description}
              />
            </div>
            <div className='col-12'>
              <button type='submit' className='btn btn-primary'>
                Update
              </button>
            </div>
          </form>
        </div>
      );
    };

export default EditKategori