import {Container, FormControl, Navbar} from 'react-bootstrap'
import React from 'react'

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
      </Container>
    </Navbar>
  )
}

export default User