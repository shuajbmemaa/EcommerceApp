import axios from 'axios';
import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { LogoutOutlined } from '@ant-design/icons';
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

    const handleLogout = () => {
      axios.get('http://localhost:8081/logoutUser')
        .then(res => {
          window.location.reload();
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
    <div>
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <h1 className="shop">TheVirtualMall</h1>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl style={{ width: 500 }} placeholder="Kërko produktin!" className="m-auto" />
        </Navbar.Text>
        <Nav className="ms-auto">
          <li onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <LogoutOutlined style={{ fontSize: '20px', marginRight: '5px', color: 'white' }} />
            <span style={{ fontSize: '16px', color: 'white',paddingRight:'10px' }}>Logout</span>
          </li>
          <li>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="secondary">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge style={{ marginLeft: '5px', color: 'white' }}>{0}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                <span style={{ padding: '10px', fontSize: '16px' }}>Shporta është e zbrazët!</span>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Nav>
      </Container>
    </Navbar>
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
          <h2 className="h2">Reviews</h2>
          {reviews.map((review, reviewIndex) => (
            <div key={reviewIndex} className="review">
              <p className="review-name">Name: {review.name}</p>
              <p className="review-rating">Rating: {review.rating}</p>
              <p className="review-comment">Comment: {review.comment}</p>
            </div>
          ))}
          <Link to="/" className="btn btn-primary">
            Kthehu
          </Link>
          <Link to="/Blej" className=" btn-b " >
            Blej
          </Link>
          </div>
       
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
      <form className="form" onSubmit={handleReviewSubmit}>
      <h2 className="h2">Shto një review</h2>
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
    </div>
  )
}

export default CartView