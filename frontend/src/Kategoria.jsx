import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Kategoria = () => {
    const [data,setData]=useState([]);

    useEffect(()=>{
      axios.get('http://localhost:8081/getKategorite')
      .then(res=>{
        if(res.data.Status === "Success"){
          setData(res.data.Result)
        }else{
          alert("Erorr")
        }
      })
      .catch(err=>console.log(err))
      },[])

      const handleDelete= (id)=>{
        axios.delete('http://localhost:8081/deleteKategori/'+id)
        .then(res=>{
          if(res.data.Status === "Success"){
            window.location.reload(true)
          }else{
            alert("Erorr")
          }
        })
        .catch(err=>console.log(err))
      }


  return (
    <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
            <h3>Kategorite:</h3>
        </div>  
        <Link to="/shtoKategori" className='btn btn-success'>Shto Kategori</Link>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {data.map((Kategoria,index)=>{
            return  <tr key={index}>
                <td>{Kategoria.id}</td>
                <td>{Kategoria.name}</td>
                <td>{Kategoria.description}</td>
                    <td>
                    <Link to={`/editKategori/` + Kategoria.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={e=> handleDelete(Kategoria.id)} className='btn btn-sm btn-danger'>Delete</button>
                    <Link to={`/kategorite/`+Kategoria.id} className='btn btn-sm btn-info ms-2'>View</Link>
                    </td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
    </div>
    
  )
}

export default Kategoria