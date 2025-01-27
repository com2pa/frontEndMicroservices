import { useState, useEffect, } from 'react';

import { Button, ButtonGroup, Card, Flex, FormControl, FormLabel, Heading, Input, useToast } from '@chakra-ui/react';
// import { Navigate} from 'react-router';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Menu from '../../layout/Menu';
import Footer from '../../layout/Footer';

const REGEX_EMAIL = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_PASS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,15}$/;

const LoginForm = ({ handleShow }) => {
  const { setAuth } = useAuth();


  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(true);

  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(true);

  const [isLoginValid, setIsLoginValid] = useState(true);

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
    // console.log(target.value)

  };
  const toast = useToast();
  const navegate = useNavigate();
  const handlePassword = ({ target }) => {
    setPassword(target.value);
    // console.log(target.value)
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setEmailValidation(REGEX_EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValidation(REGEX_PASS.test(password));
  }, [password]);

  useEffect(() => {
    setIsLoginValid(emailValidation && passwordValidation);

  }, [emailValidation, passwordValidation]);

  useEffect(() => {
    if (isLoginValid) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isLoginValid]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = {
        user_id: 1,
        email,
        password,
      };
      const response = await axios.post('/api/login', user);
      setAuth(response.data);
      setIsLoading(false);

      if (response.data) {
        // console.log('Login correcto');
        toast({
          title: 'Login correcto',
          description: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

      } else {
        // console.log('Correo o contraseña incorrectos');
        toast({
          title: 'Error de inicio de sesión',
          description: response.data.messege,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });

      }

      navegate('/dashboard');
      //window.location.pathname =`/Servicio/`
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: 'datos de ingresados',
        description: error.response.data.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });

    }


  };


  return (
    <>
      <Flex flexDir="column" gap={8} p={{base:5}} maxWidth={{base:"50rem",lg:"60rem",xl:"69rem"}}   mx="auto">
        <Menu />
        <Card 
          p={{base:3,lg:5}}  
          h={{base:"60vh",md:"65vh",lg:"75vh"}} 
          width="100%" 
          display="flex" 
          justifyContent={{base:"center", md:"center" ,lg:"center"}}
          bg="gray.50"
          borderRadius="lg"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200" 
        >
          <Flex justifyContent={{base:'center',md:"center",lg:"center",xl:"center"}}>
            <Heading> Login</Heading>
          </Flex>
          <FormControl isRequired>
            <FormControl >
              <Flex flexDir="column">
                <FormLabel fontSize={{lg:"2rem"}}> Correo </FormLabel>
                <Input onChange={handleEmailInput} type="email" value={email} placeholder="Correo" h={{lg:"3rem"}} />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex flexDir="column">
                <FormLabel fontSize={{lg:"2rem"}}> Contraseña</FormLabel>
                <Input onChange={handlePassword} type="password" value={password} placeholder="Contraseña" h={{lg:"3rem"}} />
              </Flex>
            </FormControl>

          </FormControl>
          <Flex justifyContent={{base:"center" ,md:"center",lg:"center",xl:"center"}}>
            <ButtonGroup mt='1rem' >
              <Button onClick={handleShow} variant="ghost" fontSize={{lg:"1rem",xl:"1.5rem"}}>Register</Button>
              <Button onClick={handleLogin} colorScheme="green" fontSize={{lg:"1rem",xl:"1.5rem"}} isDisabled={!isLoginValid} isLoading={!isLoading}     >Ingresar</Button>
            </ButtonGroup>

          </Flex>

        </Card>
        <Footer/>
      </Flex>
    </>

  );
};
export default LoginForm;