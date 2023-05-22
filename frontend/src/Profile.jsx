import React from 'react'
import { useState } from 'react';

const Profile = () => {
  const [userData, setUserData] = useState({});

  const handleUpdate = ()=>{
    
  }
  return (
    <div>
    <h1>Profili im</h1>
    <p>ID: {userData.id}</p>
    <p>Email: {userData.email}</p>
    <p>Password: {userData.password}</p>
    <button onClick={handleUpdate}>Përditëso të dhënat</button>
  </div>
  )
}

export default Profile