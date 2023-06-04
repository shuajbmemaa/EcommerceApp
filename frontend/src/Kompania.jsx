import { LogoutOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

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
  <button style={{ float: 'left' }} onClick={handleLogout}><LogoutOutlined/></button>
  <button onClick={karta}><ShoppingCartOutlined /></button>
  <h2 className='text-center'>Kompania</h2>   
  <h2>Produktet</h2>
  <ul>
        {produktet.map(produkt => (
          <li key={produkt.id}>
            <h3>{produkt.name}</h3>
            <p>Cmimi: {produkt.price}</p>
            <img
                  src={`http://localhost:8081/images/${produkt.image_url}`}
                  alt=""
                  className="produktet_image"
                  style={{ width: '100px', height: '100px' }}
                />
                <button onClick={karta}>Shto ne Karte!</button>
          </li> 
        ))}
      </ul>
</div>

  )
}

export default Kompania