import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Klientet from './Klientet';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Create from './Create';
import EditKlient from './EditKlient';
import Produktet from './Produktet';
import ShtoProdukte from './ShtoProdukte';
import EditProdukt from './EditProdukt';
import Kategoria from './Kategoria';
import ShtoKategori from './ShtoKategori';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditKategori from './EditKategori';
import Order from './Order';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>}>
        <Route path='' element={<Dashboard/>}></Route>
        <Route path='/klientet' element={<Klientet/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/create' element={<Create/>}></Route>
        <Route path='/produktet' element={<Produktet/>}></Route>
        <Route path='/shtoProdukte' element={<ShtoProdukte/>}></Route>
        <Route path='/editKlient/:id' element={<EditKlient/>}></Route>
        <Route path='/editProdukt/:id' element={<EditProdukt/>}></Route>
        <Route path='/kategorite' element={<Kategoria/>}></Route>
        <Route path='/shtoKategori' element={<ShtoKategori/>}></Route>
        <Route path='/editKategori/:id' element={<EditKategori/>}></Route>
        <Route path='/orders' element={<Order/>}></Route>
      </Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
