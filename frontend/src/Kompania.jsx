import { Badge, Container, Dropdown, FormControl, Nav, Navbar } from 'react-bootstrap';
import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './CategoriesStyle.css';

const Kompania = () => {
  const [produktet, setProduktet] = useState([]);
  const [karte,setKarte]=useState(0);
  const [keyword,setKeyWord]= useState("");
  const [kategoriaZgjedhur, setKategoriaZgjedhur] = useState(null);

  const handleClick = (produkt) =>{
    console.log(produkt);
  }

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
  const handleSearchChange=(productName) => {

    setKeyWord(productName.target.value.toLowerCase());
  };
  
  const searched = (keyword) => (product) => product.name.toLowerCase().includes(keyword);

  const produktetFiltruar = kategoriaZgjedhur
  ? produktet.filter((product) => product.category_id === kategoriaZgjedhur)
  : produktet.filter(searched(keyword));

  function karta(){
    setKarte(karte+1);
  }

  return (
    
    <div >
          <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
      <Container>
        <Navbar.Brand>
          <h1 className="shop">TheVirtualMall</h1>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl style={{ width: 500 }} placeholder="Kërko produktin!" value={keyword} onChange={handleSearchChange} className="m-auto" />
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
  <h2 className="kompania">*kjo faqe është vetëm për kompaninë </h2>   
  <ul className="product-list">
  {produktetFiltruar.map((product) => (
    <li key={product.id}>
      <span>
        <img src={`http://localhost:8081/images/${product.image_url}`} alt="" className="product-image" />
      </span>
      <span className="product-name">{product.name}</span>
      <span className="product-price">{product.price}€</span>
      <Link to={`/cart/${product.id}`} className="product-link">
        Shiko produktin
      </Link>
    </li>
  ))}
</ul>

</div>

  )
}

export default Kompania