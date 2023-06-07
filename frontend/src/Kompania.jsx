import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CategoriesStyle.css';

const Kompania = () => {
  const [produktet, setProduktet] = useState([]);
  const [karte,setKarte]=useState(0)

  useEffect(() => {
    fetchProduktet();
  }, []);

  const fetchProduktet = () => {
    axios.get('http://localhost:8081/produktetKompani')
      .then(res => {
        setProduktet(res.data);
      })
      .catch(err => console.log(err));
  };
  
  const handleLogout = () => {
    axios.get('http://localhost:8081/logoutKompani')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  function karta(){
    setKarte(karte+1);
  }

  return (
    <div >
          <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <h1 style={{ color: 'cyan', fontSize: '28px', fontWeight: 'bold' }}>Shopping cart</h1>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl style={{ width: 500 }} placeholder="Kërko produktin!" className="m-auto" />
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
                <span style={{ padding: '10px', fontSize: '16px' }}>Karta është zbrazët!</span>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Nav>
      </Container>
    </Navbar>
  <h2 className='text-center'>Kompaniaa</h2>   
  <h2>Produktet</h2>
  <ul>
        {produktet.map(produkt => (
          <li key={produkt.id}>
            <h3>{produkt.name}</h3>
            <p>Çmimi: {produkt.price}</p>
            <img
                  src={`http://localhost:8081/images/${produkt.image_url}`}
                  alt=""
                  className="produktet_image"
                  style={{ width: '100px', height: '100px' }}
                />
                <Link to={`/cart/` + produkt.id} className='btn btn-primary btn-sm me-2'>Shto ne kartë!</Link>
          </li> 
        ))}
      </ul>
</div>

  )
}

export default Kompania