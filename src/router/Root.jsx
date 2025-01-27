
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
// import axios from 'axios';
import Public from '../router/Public';
import PrivateRoute from '../router/PrivateRoute';
import { useAuth } from '../hooks/useAuth';
// import PersistAuth from '../components/PersistAuth';




export const Root = () => {
  const { isAuthenticated } = useAuth();
  return (


    <BrowserRouter>  
      <PrivateRoute />
      <Public />
    </BrowserRouter>


  );

};

export default Root;