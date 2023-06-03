import React, { useState ,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditProdukt = () => {
    const[data,setData]=useState({
        name:'',
        description:'',
        price:'',
        stock:''
    })

    const navigate=useNavigate();

    const {id} = useParams();

    useEffect(()=>{
        axios.get('http://localhost:8081/getProdukt/'+id)
        .then(res => {
            setData({...data,
                name:res.data.Result[0].name,
                description:res.data.Result[0].description,
                price:res.data.Result[0].price,
                stock:res.data.Result[0].stock
            })
        })
        .catch(err => console.log(err))
    },[])
    
    const handleSubmit=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:8081/updateProduct/'+id,data)
        .then(res =>{
            if(res.data.Status === "Success"){
            navigate('/produktet')
        }
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
                <h2>Updatee Product</h2>
                <form class="row g-3 w-50" onSubmit={handleSubmit}>
                <div class="col-12">
                        <label for="inputName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                        onChange={e => setData({...data, name: e.target.value})} value={data.name}/>
                    </div>
                    <div class="col-12">
                        <label for="inputDescription" class="form-label">Description</label>
                        <input type="text" class="form-control" id="inputDescription" placeholder='Enter descritpion' autoComplete='off'
                        onChange={e => setData({...data, description: e.target.value})} value={data.description}/>
                    </div>
                    <div class="col-12">
                        <label for="inputPrice" class="form-label">Price</label>
                        <input type="text" class="form-control" id="inputPrice" placeholder="Shtyp cmimin e produktit" autoComplete='off'
                        onChange={e => setData({...data, price: e.target.value})} value={data.price}/>
                    </div>
                    <div class="col-12">
                        <label for="inputStock" class="form-label">Stock</label>
                        <input type="text" class="form-control" id="inputStock" placeholder="Shtyp sa produkte kan mbetur" autoComplete='off'
                        onChange={e => setData({...data, stock: e.target.value})} value={data.stock}/>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
      )
}

export default EditProdukt