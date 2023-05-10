import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Klientet = () => {

  const [data,setData]=useState([])

  useEffect(()=>{
      axios.get('http://localhost:8081/getKlientat')
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
        axios.delete('http://localhost:8081/delete/'+id)
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
            <h3>Lista e Klienteve :</h3>
        </div>
        <Link to="/create" className='btn btn-success'>Shto Klienta</Link>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Klientet,index)=>{
             return <tr key={index}>
                  <td>{Klientet.name}</td>
                  <td>{
                    <img src={`http://localhost:8081/images/` + Klientet.image} alt="" 
                    className='klientat_image'/>
                    }</td>
                  <td>{Klientet.email}</td>
                  <td>{Klientet.address}</td>
                  <td>
                    <Link to={`/editKlient/` + Klientet.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={e=> handleDelete(Klientet.id)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Klientet