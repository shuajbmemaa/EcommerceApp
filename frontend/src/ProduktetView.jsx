import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './produktetV.css'

const ProduktetView = () => {
    const [produktet, setProduktet] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8081/getProduktetView/'+id)
          .then(res => {
            if (res.data.Status === "Success") {
              setProduktet(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      },[]);
        return (
          <div className="table-container">
            <table>
        <tbody>
                {produktet.map((produkti, index) => (
                  <tr key={index}>
                    <td >Id :{produkti.id}</td>
                    <td>Emri :{produkti.name}</td>
                    <td>Pershkrimi :{produkti.description}</td>
                    <td>Cmimi :{produkti.price}</td>
                    <td>Foto :{
                    <img src={`http://localhost:8081/images/` + produkti.image_url} alt="" 
                    className='produktet_image'/>
                    }</td>
                    <td>Stock :{produkti.stock}</td>
                    <td>Kategori :{produkti.category_id}</td>
                    <td>Krijuar me :{produkti.created_at}</td>
                    <td>
                    <Link to="/produktet" className='button'>
                        Kthehu tek produktet
                    </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
              </div>
        )
                  }

export default ProduktetView;