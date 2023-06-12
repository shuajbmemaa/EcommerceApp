import axios from 'axios';
import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { LogoutOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import './Blej.css'
import { toast } from 'react-toastify';

const Blej = () => {
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
          user_id: window.localStorage.getItem("userId"),
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
    <h2 className="porosia">Plotësoni të dhënat e porosisë</h2>
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
        <Link to="/" className="btn btn-dark buttoni">
            Anulo
          </Link>
      </form>
    </div>
  
  )
}

export default Blej