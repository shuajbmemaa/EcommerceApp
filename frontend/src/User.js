import {Container, Navbar} from 'react-bootstrap'
import React from 'react'

const User = () => {
  return (
    <Navbar bg="dark" variant='dark' style={{height:80}}>
      <Container>
        <Navbar.Brand>
          <h1>Shopping cart</h1>
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default User