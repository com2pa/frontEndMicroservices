import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Center, Spinner } from '@chakra-ui/react';

const PersistAuth = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(auth.name ? false : true); // Solo cargar si no hay auth

  useEffect(() => {
    const handleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_USER}/api/refres`
        );
        // const { data } = await axios.get(
        //   `/api/refres`
        // );

        setAuth(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setAuth({}); // Limpiar auth si hay error
        setIsLoading(false);
      }
    };
    handleUser();
  }, [setAuth]);

  // 🌀 Loader mientras obtenemos la sesión
  if (isLoading) {
    return (
      <Center
        margin='5rem'
        flexDirection='column'
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    );
  }

  //cuando estdoy en home
  if (location.pathname === '/') {
    if (auth?.name) {
      return (
        <Navigate
          to='/dashboard'
          state={{ from: location }}
          replace
        />
      );
    } else {
      return <Outlet />;
    }
  }

  //cuando estoy en cualquier ruta privada
  if (auth?.name) {
    return <Outlet />;
  } else {
    return (
      <Navigate
        to='/'
        state={{ from: location }}
        replace
      />
    );
  }
};

export default PersistAuth;
