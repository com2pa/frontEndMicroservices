import { Card, Center, Flex, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Verify = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        // Extraer ID y Token correctamente con HashRouter
        const pathParts = window.location.hash.split('/');
        const id = pathParts[2];
        const token = pathParts[3];

        await axios.patch(
          `/api/users/${id}/${token}`,
          {},
          { withCredentials: true }
        );

        // Redirigir correctamente con react-router
        navigate('/login');
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || 'Error en la verificación'
        );
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <Center
      margin='5rem'
      flexDirection='column'
    >
      <Card
        padding='2rem 5rem'
        background='gray.500'
        textAlign='center'
      >
        <h1>Verificación</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: errorMessage || 'Estamos verificando tu cuenta...',
          }}
        />
        <Flex
          justify='center'
          mt='1rem'
        >
          <Spinner
            display={errorMessage ? 'none' : 'flex'}
            justifyContent='center'
          />
        </Flex>
      </Card>
    </Center>
  );
};

export default Verify;
