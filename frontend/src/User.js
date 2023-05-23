import {Badge, Container, Dropdown, FormControl, Nav, Navbar} from 'react-bootstrap'
import React from 'react'
import {FaShoppingCart} from 'react-icons/fa'

const User = () => {
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
      </Container>
    </Navbar>
  )
}

export default User