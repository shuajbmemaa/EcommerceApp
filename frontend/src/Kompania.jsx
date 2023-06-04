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
    <header className='header'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-3 col-lg-2'>
            <div className='header__logo'>
              <font>eStore</font>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Kompania