import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Kategoria = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getCategories')
      .then(res => {
        if (res.data.Status === "Success") {
          setCategories(res.data.Result);
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
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center'>
        <h3>Lista e Kategorive:</h3>
      </div>
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
            {categories.map((kategori, index) => (
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
