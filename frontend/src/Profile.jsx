import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState([]);

  
  return (
    <div className='mt-4 px-5 pt-3'>
        <h3 className='text-center'>Profili im </h3>
        <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(users => (
            <tr key={users.id}>
              <td>{users.id}</td>
              <td>{users.name}</td>
              <td>{users.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
}

export default Profile