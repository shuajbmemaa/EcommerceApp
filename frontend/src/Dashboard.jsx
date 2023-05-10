import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

    const [adminCount,setAdminCount]=useState()
    const [userCount,setUserCount]=useState()
    const[productCount,setProductCount]=useState();
    const [admins, setAdmins] = useState([]);

    useEffect(()=>{
      axios.get('http://localhost:8081/productCount')
      .then(res=>{
        setProductCount(res.data[0].product)
      })
      .catch(err=> console.log(err))
    },[])

    useEffect(() => {
      axios.get('http://localhost:8081/admins')
        .then(res => {
          setAdmins(res.data);
        })
        .catch(err => console.log(err));
    }, []);


    useEffect(()=>{
        axios.get('http://localhost:8081/adminCount')
        .then(res=>{
            setAdminCount(res.data[0].admin)
        })
        .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
      axios.get('http://localhost:8081/userCount')
      .then(res=>{
          setUserCount(res.data[0].users)
      })
      .catch(err=>console.log(err))
    },[])

  return (
    <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3  pt-2 pb-3 border shadow-sm w-25'>
           <div className='text-center pb-1'>
            <h4>Admin</h4>
            </div>
            <hr />
            <div className=''>
                <h5>Total : {adminCount}</h5>
            </div>
            </div>
            <div className='px-3  pt-2 pb-3 border shadow-sm w-25'>
           <div className='text-center pb-1'>
            <h4>Klientet</h4>
            </div>
            <hr />
            <div className=''>
                <h5>Total : {userCount}</h5>
            </div>
            </div>
            <div className='px-3  pt-2 pb-3 border shadow-sm w-25'>
           <div className='text-center pb-1'>
            <h4>Produktet</h4>
            </div>
            <hr />
            <div className=''>
                <h5>Total : {productCount}</h5>
            </div>
            </div>

            </div>


            <div className='mt-4 px-5 pt-3'>
        <h3>List of Admins</h3>
        <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {admins.map(admin => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Dashboard