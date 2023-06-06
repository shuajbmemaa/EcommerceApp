import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Order = () => {
    const [data,setData]=useState([])

    useEffect(()=>{
      axios.get('http://localhost:8081/getOrders')
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
  return (
    <div className='px-5 py-3'>
        <div className='d-flex justify-content-center'>
            <h3>Orders:</h3>
        </div>
        <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Order Date</th>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>Country</th>
              <th>Postal Code</th>
              <th>Status</th>

            </tr>
          </thead>
          <tbody>
            {data.map((Order,index)=>{
             return <tr key={index}>
                  <td>{Order.id}</td>
                  <td>{Order.user_id}</td>
                  <td>{Order.oder_date}</td>
                  <td>{Order.name}</td>
                  <td>{Order.address}</td>
                  <td>{Order.city}</td>
                  <td>{Order.country}</td>
                  <td>{Order.postal_code}</td>
                  <td>{Order.status}</td>
              </tr>
            })}
          </tbody>
        </table>
        </div>
    </div>
  )
}

export default Order