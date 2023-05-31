import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'

const ShtoKategori = () => {
  const [kategori, setKategori] = useState({
    name: '',
    description: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/createCategory', kategori)
      .then(res => {
        navigate('/kategorite');
        toast.success('Kategoria u shtua!');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Shto Kategori</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">Emri</label>
          <input type="text" class="form-control" id="inputName" placeholder='Vendos Emrin' autoComplete='off'
            onChange={e => setKategori({ ...kategori, name: e.target.value })} />
        </div>
        <div class="col-12">
          <label for="inputDescription" class="form-label">Përshkrimi</label>
          <textarea class="form-control" id="inputDescription" rows="3" placeholder='Vendos Përshkrimin'
            onChange={e => setKategori({ ...kategori, description: e.target.value })}></textarea>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Krijo</button>
        </div>
      </form>
    </div>
  );
};

export default ShtoKategori;
