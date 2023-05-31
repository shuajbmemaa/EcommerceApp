import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProduktetView = () => {
    const [produktet, setProduktet] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        axios.get('http://localhost:8081/getProduktetView/'+id)
          .then(res => {
            if (res.data.Status === "Success") {
              setProduktet(res.data.Result);
            } else {
              alert("Error");
            }
          })
          .catch(err => console.log(err));
      },[]);
      return (
        <div><h2>View</h2></div>
      )
                }

export default ProduktetView;