import {Badge, Container, Dropdown, FormControl, Nav, Navbar} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import {FaShoppingCart} from 'react-icons/fa';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CategoriesStyle.css'

const User = () => {

  const [produktet,setProduktet]=useState([]);
  const[kategoriteUser,setKategoriteUser]=useState([])

  useEffect(()=>{
    axios.get('http://localhost:8081/user/kategorite')
    .then(response =>{
      setKategoriteUser(response.data)
    })
    .catch(err =>{
      console.log(err)
    })
  },[])

  useEffect(()=>{
    axios.get('http://localhost:8081/produktetUser')
    .then(response=>{
      setProduktet(response.data)
    })
    .catch(err=>{
      console.log('Gabim gjate shfaqjes se produkteve',err);
    })
  },[])

  const handleLogout = () => {
    axios.get('http://localhost:8081/logoutUser')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  
  return (
    <div>
    <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <h1 style={{ color: 'cyan', fontSize: '28px', fontWeight: 'bold' }}>Shopping cart</h1>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl style={{ width: 500 }} placeholder="Shiko per produkte" className="m-auto" />
        </Navbar.Text>
        <Nav className="ms-auto">
          <li onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <LogoutOutlined style={{ fontSize: '20px', marginRight: '5px', color: 'white' }} />
            <span style={{ fontSize: '16px', color: 'white' }}>Logout</span>
          </li>
          <li>
            <Dropdown alignRight>
              <Dropdown.Toggle variant="success">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge style={{ marginLeft: '5px' }}>{0}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ minWidth: 370 }}>
                <span style={{ padding: '10px', fontSize: '16px' }}>Karte eshte zbrazet</span>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Nav>
      </Container>
    </Navbar>
    <Container>
      <h2 style={{ marginTop: '20px',textAlign:'center' }}>Kategorite</h2>
      <ul className="categories-list">
        {kategoriteUser.map(kategori=>{
          return(
          <li key={kategori.id} className="category-item">
            {kategori.name}
          </li>
          )
        })}
      </ul>

      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {produktet.map((product) => (
          <li key={product.id} style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '10px' }}>{product.name}</span>
            <span style={{ marginRight: '10px' }}>{product.price}</span>
            <span>
              <img
                src={`http://localhost:8081/images/${product.image_url}`}
                alt=""
                className="produktet_image"
                style={{ width: '100px', height: '100px' }}
              />
            </span>
          </li>
        ))}
      </ul>
    </Container>
  </div>
     
  )
}

export default User