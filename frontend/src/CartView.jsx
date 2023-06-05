import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const CartView = () => {
    const [view, setView] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8081/getCartView/'+id)
          .then(res => {
            if (res.data.Status === "Success") {
              setView(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      },[]);


  return (
    <div>
        <tbody>
                {view.map((karta, index) => (
                  <tr key={index}>
                    <td>Id :{karta.id}</td>
                    <td>Emri :{karta.name}</td>
                    <td>Pershkrimi :{karta.description}</td>
                    <td>Cmimi :{karta.price}</td>
                    <td>Foto :{
                    <img src={`http://localhost:8081/images/` + karta.image_url} alt="" 
                    className='produktet_image'/>
                    }</td>
                    <td>Stock :{karta.stock}</td>
                    <td>Kategori :{karta.category_id}</td>
                    <td>Krijuar me :{karta.created_at}</td>
                    <Link to="/" className='btn btn-primary'>
                        Kthehu
                    </Link>
                  </tr>
                ))}
              </tbody>
              </div>
  )
}

export default CartView