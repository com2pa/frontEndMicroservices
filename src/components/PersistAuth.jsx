import { Navigate, Outlet, useLocation } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Center, Spinner } from '@chakra-ui/react';


const PersistAuth = () => {
  const location = useLocation();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(!auth.name); // Solo cargar si no hay auth

  useEffect(() => {
    const handleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_USER}/api/refres`,
          { withCredentials: true } // Enviar cookies con la solicitud
        );
        // const { data } = await axios.get(
        //   `/api/refres`
        //   // { withCredentials: true } // Enviar cookies con la solicitud
        // );

        setAuth(data);
      } catch (error) {
        console.error(
          'Error al obtener usuario:',
          error.response?.data || error.message
        );
        setAuth({}); // Limpiar auth si hay error
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth.name) {
      handleUser();
    }
  }, [auth.name, setAuth]);

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

  // 🔄 Redirigir según el estado de autenticación
  if (location.pathname === '/') {
    return auth?.name ? (
      <Navigate
        to='/dashboard'
        replace
      />
    ) : (
      <Outlet />
    );
  }

  // Si no estamos autenticados, redirigimos al inicio
  if (!auth?.name) {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  // Si estamos autenticados, dejamos pasar a las rutas hijas
  return <Outlet />;
};

export default PersistAuth;
