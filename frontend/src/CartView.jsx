import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './CartView.css'
import { toast } from 'react-toastify';

const CartView = () => {
    const [view, setView] = useState([]);
    const [order, setOrder] = useState({
      name: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      status: 'Pending'
    });
    const [review, setReview] = useState({
      name: '',
      rating: 0,
      comment: ''
    });
    const [reviews, setReviews] = useState([]);

    const handleReviewSubmit = e => {
      e.preventDefault();
      axios.post('http://localhost:8081/createReview', {
        product_id: id,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        created_at: new Date()
      })
        .then(res => {
          if (res.data.status === 'Success') {
            toast.success('Review added!')
          } else {
            alert('Gabim gjate shtimit te review');
          }
        })
        .catch(err => console.log(err));
    };

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
      useEffect(() => {
        axios.get(`http://localhost:8081/getReviews/${id}`)
          .then(res => {
            if (res.data.Status === "Success") {
              setReviews(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      }, [id]);


  return (
    <div className="cart-view">
      {view.map((karta, index) => (
        <div className="card" key={index}>
          <img
            src={`http://localhost:8081/images/` + karta.image_url}
            alt=""
            className="card-image"
          />
          <div className="card-details">
            <h3 className="card-title">{karta.name}</h3>
            <p className="card-description">{karta.description}</p>
            <p className="card-price">Çmimi: {karta.price}</p>
            <p className="card-stock">Stock: {karta.stock}</p>
            <p className="card-category">Kategori: {karta.category_id}</p>
            <p className="card-created">Krijuar me: {karta.created_at}</p>
          </div>
          <h2 className="h2">Reviews</h2>
          {reviews.map((review, reviewIndex) => (
            <div key={reviewIndex} className="review">
              <p className="review-name">Name: {review.name}</p>
              <p className="review-rating">Rating: {review.rating}</p>
              <p className="review-comment">Comment: {review.comment}</p>
              <p className="review-created-at">Created At: {review.created_at}</p>
            </div>
          ))}
          <Link to="/" className="btn btn-primary">
            Kthehu
          </Link>
        </div>
      ))}
    <h2 className="h2">Plotësoni të dhënat e porosisë</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Emri</label>
          <input
            type="text"
            id="name"
            value={order.name}
            onChange={e => setOrder({ ...order, name: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresa</label>
          <input
            type="text"
            id="address"
            value={order.address}
            onChange={e => setOrder({ ...order, address: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">Qyteti</label>
          <input
            type="text"
            id="city"
            value={order.city}
            onChange={e => setOrder({ ...order, city: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Vendi</label>
          <input
            type="text"
            id="country"
            value={order.country}
            onChange={e => setOrder({ ...order, country: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="postalCode">Kodi Postar</label>
          <input
            type="text"
            id="postalCode"
            value={order.postalCode}
            onChange={e => setOrder({ ...order, postalCode: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Statusi</label>
          <input
            type="text"
            id="status"
            value={order.status}
            onChange={e => setOrder({ ...order, status: e.target.value })}
            className="input"
          />
        </div>
        <button type="submit" className="buttonn">Porosit</button>
      </form>
      <h2 className="h2">Shto një review</h2>
      <form className="form" onSubmit={handleReviewSubmit}>
        <div className="form-group">
          <label htmlFor="reviewName">Emri</label>
          <input
            type="text"
            id="reviewName"
            value={review.name}
            onChange={e => setReview({ ...review, name: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewRating">Vlerësimi</label>
          <input
            type="number"
            id="reviewRating"
            value={review.rating}
            onChange={e => setReview({ ...review, rating: e.target.value })}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="reviewComment">Komenti</label>
          <textarea
            id="reviewComment"
            value={review.comment}
            onChange={e => setReview({ ...review, comment: e.target.value })}
            className="textarea"
          ></textarea>
        </div>
        <button type="submit" className="buttonn">Shto Review</button>
      </form>
    
    </div>
  )
}

export default CartView