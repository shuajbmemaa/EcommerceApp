import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'

const Kategoria = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios.get('http://localhost:8081/getCategories')
      .then(res => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/deleteCategory/' + id)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
          toast.success('Kategoria u fshie me sukses');
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter((Kategoria) =>
  Kategoria.name.toLowerCase().includes(searchTerm.toLowerCase())
);;

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Lista e Kategorive:</h3>
      </div>
      <input
        type="text"
        placeholder="Kërko kategorin..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-3"
      />
      <Link to="/shtoKategori" className='btn btn-success'>Shto Kategori</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Emri</th>
              <th>Përshkrimi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((kategori, index) => (
              <tr key={index}>
                <td>{kategori.id}</td>
                <td>{kategori.name}</td>
                <td>{kategori.description}</td>
                <td>
                  <Link to={`/editKategori/` + kategori.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={() => handleDelete(kategori.id)} className='btn btn-sm btn-danger'>Delete</button>
                  <Link to={`/kategorite/` + kategori.id} className='btn btn-sm btn-info ms-2'>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategoria;
