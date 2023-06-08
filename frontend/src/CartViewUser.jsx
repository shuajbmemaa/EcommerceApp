import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './CartView.css'
import { toast } from 'react-toastify';

const CartViewUser = () => {
    const [view, setView] = useState([]);
    const [order, setOrder] = useState({
      name: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      status: 'Pending'
    });

    

    const handleSubmit = e => {
      e.preventDefault();
      axios.post('http://localhost:8081/createOrder', {
          user_id: id,
          order_date: new Date(),
          name: order.name,
          address: order.address,
          city: order.city,
          country: order.country,
          postal_code: order.postalCode,
          status: order.status
        })
        .then(res => {
          if (res.data.status === 'Success') {
            toast.success('Order done!')
          } else {
            alert('Gabim gjatë regjistrimit të porosisë');
          }
        })
        .catch(err => console.log(err));
    };
    

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
<div className="cart-view">
      {view.map((karta, index) => (
        <div className="card" key={index}>
          <div className="card-details">
          <img
            src={`http://localhost:8081/images/` + karta.image_url}
            alt=""
            className="card-image"
          />
           <div className="details">
            <h3 className="card-title">{karta.name}</h3>
            <p className="card-description">{karta.description}</p>
            <p className="card-price">Çmimi: {karta.price}</p>
            <p className="card-stock">Stock: {karta.stock}</p>
            <p className="card-category">Kategori: {karta.category_id}</p>
            <p className="card-created">Krijuar me: {karta.created_at}</p>
          </div>
          <Link to="/" className=" btn-dark ">
            Kthehu
          </Link>
          <Link to="/Blej" className=" btn-primary " >
            Blej
          </Link>
          </div>
       
        </div>
      ))}
    </div>
  )
}

export default CartViewUser