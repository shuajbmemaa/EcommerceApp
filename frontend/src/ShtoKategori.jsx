import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShtoKategori = () => {

  const [kategori,setKategori]=useState({
    name:'',
    description:''
  })

  const navigate=useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:8081/kategorite/create',kategori)
    .then(res=>{
      navigate('/kategorite')
    }).catch(err => console.log(err));
  }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Create Category</h2>
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
            onChange={e => setKategori({ ...kategori, name: e.target.value })}
          />
        </div>
        <div className='col-12'>
          <label htmlFor='inputDescription' className='form-label'>
            Description
          </label>
          <textarea
            className='form-control'
            id='inputDescription'
            rows='3'
            placeholder='Enter Description'
            onChange={e =>
              setKategori({ ...kategori, description: e.target.value })
            }
          ></textarea>
        </div>
        <div className='col-12'>
          <button type='submit' className='btn btn-primary'>
            Create
          </button>
        </div>
      </form>
    </div>
  );
          }

export default ShtoKategori