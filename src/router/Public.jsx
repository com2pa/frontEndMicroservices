
import {  Route, Routes } from 'react-router-dom';

import Verify from '../pages/verify';
import PersistAuth from '../components/PersistAuth';
import Registro from "../pages/Login/Registro";
import Login from "../pages/Login/Login";
import Home from '../pages/Home';
// import { QuienesSomos } from '../pages/QuienesSomos';

export const Root = () => {
  return (
    <>
      <Routes>
        <Route element={<PersistAuth />}>
          <Route path='/' element={<Home />} />   
        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/verify/:id/:token' element={<Verify />} />
        <Route path='/registro' element={<Registro/>}/>
      </Routes>

    </>
  );

};

export default Root;