import {Badge, Container, Dropdown, FormControl, Nav, Navbar} from 'react-bootstrap'
import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import { LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

const User = () => {

  const handleLogout = () => {
    axios.get('http://localhost:8081/logoutUser')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  
  return (
    <Navbar bg="dark" variant='dark' style={{height:80}}>
      <Container>
        <Navbar.Brand>
          <h1>Shopping cart</h1>
        </Navbar.Brand>
        <Navbar.Text className='search'>
          <FormControl style={{width: 500}} placeholder='Shiko per produkte' className='m-auto'/>
        </Navbar.Text>
        <Nav>
          <Dropdown alignRight>
            <Dropdown.Toggle variant='success'>
              <FaShoppingCart color='white' fontSize="25px"/>
              <Badge>{0}</Badge>
              
            </Dropdown.Toggle>
            
            <Dropdown.Menu style={{minWidth:370}}>
              <span style={{padding:10}}>Karte eshte zbrazet</span>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
        <Nav>
        <li onClick={handleLogout}>
								<a href="#" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-power"></i> <span className="ms-1 d-none d-sm-inline">Logout</span></a>
							</li>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default User