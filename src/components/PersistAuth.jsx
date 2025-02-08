import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Center } from '@chakra-ui/react';
import { BoxesLoader } from 'react-awesome-loaders-py3';

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
        <BoxesLoader
          boxColor='#6366F1'
          style={{ marginBottom: '20px' }}
          desktopSize='128px'
          mobileSize='80px'
          text='Aguarde unos minutos..'
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

  return auth?.name ? (
    <Outlet />
  ) : (
    <Navigate
      to='/'
      replace
    />
  );
};

export default PersistAuth;
