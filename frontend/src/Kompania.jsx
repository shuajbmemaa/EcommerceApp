import { LogoutOutlined } from '@ant-design/icons';
import axios from 'axios';
import React from 'react'

const Kompania = () => {

  const handleLogout = () => {
    axios.get('http://localhost:8081/logoutKompani')
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Kompania</h2>
      <li onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <LogoutOutlined style={{ fontSize: '20px', marginRight: '5px', color: 'black' }} />
            <span style={{ fontSize: '16px', color: 'white' }}>Logout</span>
          </li>
    </div>
    
  )
}

export default Kompania