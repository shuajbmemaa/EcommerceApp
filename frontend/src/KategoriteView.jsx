import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';


const KategoriteView = () => {
    const [category, setCategory] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8081/getCategoryView/'+id)
          .then(res => {
            if (res.data.Status === "Success") {
              setCategory(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      },[]);


  return (
    <div>
    <tbody>
            {category.map((kategori, index) => (
              <tr key={index}>
                <td>Id :{kategori.id}</td>
                <td>Emri :{kategori.name}</td>
                <td>Pershkrimi :{kategori.description}</td>
                <Link to="/kategorite" className='btn btn-primary'>
                    Kthehu te Kategorite
                </Link>
              </tr>
            ))}
          </tbody>
          </div>
  )
            }


export default KategoriteView