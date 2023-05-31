import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'


const ShtoProdukte = () => {
        
      const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        categoryId: ''
      })
    
      const navigate = useNavigate()
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();  
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("image", product.image);
        formData.append("stock", product.stock);
        formData.append("categoryId", product.categoryId);
        axios.post('http://localhost:8081/produktet/create', formData)
          .then(res => {
            navigate('/produktet')
            toast.success('Produkti u shtua me sukses');
          })
          .catch(err => console.log(err))
      }
    
      return (
        <div className='d-flex flex-column align-items-center pt-4'>
          <h2>Create Product</h2>
          <form class="row g-3 w-50" onSubmit={handleSubmit}>
            <div class="col-12">
              <label for="inputName" class="form-label">Name</label>
              <input type="text" class="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
                onChange={e => setProduct({ ...product, name: e.target.value })} />
            </div>
            <div class="col-12">
              <label for="inputDescription" class="form-label">Description</label>
              <textarea class="form-control" id="inputDescription" rows="3" placeholder='Enter Description'
                onChange={e => setProduct({ ...product, description: e.target.value })}></textarea>
            </div>
            <div class="input-group">
            <span class="input-group-text">$</span>
            <input type="number" class="form-control" id="inputPrice" placeholder='Enter Price'
              onChange={e => setProduct({ ...product, price: e.target.value })} />
          </div>
            <div class="col-12 mb-3">
              <label class="form-label" for="inputGroupFile01">Select Image</label>
              <input type="file" class="form-control" id="inputGroupFile01"
                onChange={e => setProduct({ ...product, image: e.target.files[0] })} />
            </div>
            <div class="col-12">
              <label for="inputStock" class="form-label">Stock</label>
              <input type="number" class="form-control" id="inputStock" placeholder='Enter Stock'
                onChange={e => setProduct({ ...product, stock: e.target.value })} />
            </div>
            <div class="col-12">
              <label for="inputCategoryId" class="form-label">Category ID</label>
              <input type="text" class="form-control" id="inputCategoryId" placeholder='Enter Category ID'
                onChange={e => setProduct({ ...product, categoryId: e.target.value })} />
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      )
    }

export default ShtoProdukte