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
          <Link to="/" className=" btn-a ">
            Kthehu
          </Link>
          <Link to="/Blej" className=" btn-b " >
            Blej
          </Link>
          </div>
       
        </div>
      ))}
      
      <h2 className="review-heading">Vlerëso produktin </h2>
<form className="review-form" onSubmit={handleReviewSubmit}>
  <div className="form-group">
    <label htmlFor="reviewName">Titulli për vlerësim</label>
    <input
      type="text"
      id="reviewName"
      value={review.name}
      onChange={e => setReview({ ...review, name: e.target.value })}
      className="input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="reviewRating">Vlerësimi juaj?</label>
    <input
      type="number"
      id="reviewRating"
      value={review.rating}
      onChange={e => setReview({ ...review, rating: e.target.value })}
      className="input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="reviewComment">Mendimi juaj për produktin</label>
    <textarea
      id="reviewComment"
      value={review.comment}
      onChange={e => setReview({ ...review, comment: e.target.value })}
      className="textarea"
    ></textarea>
  </div>
  <button type="submit" className="review-submit-button">Shto vlerësimin! </button>
</form>

    
    </div>
    </div>
  )
}

export default CartView