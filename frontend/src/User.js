import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import './CategoriesStyle.css';
import { Link } from 'react-router-dom';

const User = () => {
  const [produktet, setProduktet] = useState([]);
  const [kategoriteUser, setKategoriteUser] = useState([]);
  const [kategoriaZgjedhur, setKategoriaZgjedhur] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8081/user/kategorite')
      .then(response => {
        setKategoriteUser(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8081/produktetUser')
      .then(response => {
        setProduktet(response.data);
      })
      .catch(err => {
        console.log('Gabim gjatë shfaqjes së produkteve', err);
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logoutUser')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  const handlePriceFilter = async (range) => {
    try {
      const response = await axios.get(`http://localhost:8081/produktetUser?priceRange=${range}`);
      setProduktet(response.data);
      setPriceRange(range);
    } catch (error) {
      console.log('Gabim gjatë filtrimit të produktit', error);
    }
  };

  const handleKategoriaClick = (kategoriaId) => {
    setKategoriaZgjedhur(kategoriaId);
  };

  const produktetFiltruar = kategoriaZgjedhur
    ? produktet.filter(product => product.category_id === kategoriaZgjedhur)
    : produktet;

    function karta(){
      setKarte(karte+1);
    }
  
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
                <span style={{ padding: '10px', fontSize: '16px' }}>Shporta është e zbrazët!</span>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </Nav>
      </Container>
    </Navbar>
      <Container>
        <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Kategoritë</h2>
        <ul className="categories-list">
          {kategoriteUser.map(kategori => (
            <li
              key={kategori.id}
              className={`category-item ${kategoriaZgjedhur === kategori.id ? 'selected' : ''}`}
              onClick={() => handleKategoriaClick(kategori.id)}
            >
              {kategori.name}
            </li>
          ))}
        </ul>
        <div>
        <button onClick={() => handlePriceFilter('0-100')}>0-100</button>
        <button onClick={() => handlePriceFilter('100-200')}>100-200</button>
        <button onClick={() => handlePriceFilter('200-500')}>200-500</button>
        <button onClick={() => handlePriceFilter('1000+')}>&gt;1000</button>
      </div>

        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {produktetFiltruar.map(product => (
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
              <Link to={`/cart/` + product.id} className='btn btn-primary btn-sm me-2'>Shto ne shportë!</Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};

export default User;
