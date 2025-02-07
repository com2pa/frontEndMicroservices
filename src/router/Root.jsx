
import { HashRouter as Router } from 'react-router-dom';
// import axios from 'axios';
import Public from '../router/Public';
import PrivateRoute from '../router/PrivateRoute';
// import { useAuth } from '../hooks/useAuth';


export const Root = () => {
  // const { isAuthenticated } = useAuth();
  return (


    <Router>  
      <PrivateRoute />
      <Public />
    </Router>


  );

};

export default Root;