import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ShtoKategori = () => {

  const [kategorite,setKategorite]=useState({
    name:'',
    description:''
  })

  const nav=useNavigate();

  const handleSubmit=(event)=>{
    event.preventDefault();
    const formData=new FormData();
    formData.append("name",kategorite.name);
    formData.append("description",kategorite.description);
    axios.post('http://localhost:8081/kategorite/create',formData)
    .then(res=>{
      nav('/kategorite')
    }).catch(err => console.log(err));
  }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
          <h2>Create Product</h2>
          <form class="row g-3 w-50" onSubmit={handleSubmit}>
            <div class="col-12">
              <label for="inputName" class="form-label">Name</label>
              <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                onChange={e => setKategorite({ ...kategorite, name: e.target.value })} />
            </div>
            <div class="col-12">
              <label for="inputDescription" class="form-label">Description</label>
              <textarea class="form-control" id="inputDescription" rows="3" placeholder='Enter Description'
                onChange={e => setKategorite({ ...kategorite, description: e.target.value })}></textarea>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
  )
}

export default ShtoKategori