import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Produktet = () => {

  const [data,setData]=useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8081/getProduktet')
    .then(res=>{
      if(res.data.Status === "Success"){
        console.log(res.data.Result);
        setData(res.data.Result)
      }else{
        alert("Erorr")
      }
    })
    .catch(err=>console.log(err))
    },[])

    const handleDelete= (id)=>{
      axios.delete('http://localhost:8081/deleteProduct/'+id)
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
            <h3>Lista e Produkteve :</h3>
        </div>  
        <Link to="/shtoProdukte" className='btn btn-success'>Shto Produkte</Link>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Image</th>
              <th>Stock</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Produktet,index)=>{
            return  <tr key={index}>
                <td>{Produktet.name}</td>
                <td>{Produktet.description}</td>
                <td>{Produktet.price}</td>
                <td>{
                    <img src={`http://localhost:8081/images/` + Produktet.image_url} alt="" 
                    className='produktet_image'/>
                    }</td>
                <td>{Produktet.stock}</td>
                    <td>
                    <Link to={`/editProdukt/` + Produktet.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                    <button onClick={()=> handleDelete(Produktet.id)} className='btn btn-sm btn-danger'>Delete</button>
                    <Link to={`/produktet/`+Produktet.id} className='btn btn-sm btn-info ms-2'>View</Link>
                    </td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Produktet