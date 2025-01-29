'use client';

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Menu from '../../layout/Menu';
import Footer from '../../layout/Footer';
import { useNavigate } from 'react-router-dom';

const REGEX_EMAIL =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const REGEX_NAME = /^[A-Z][a-z]*[ ][A-Z][a-z]*$/;
const REGEX_PASS = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).{8,15}$/;

export const SignupCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(false);

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState(false);
  const navigate = useNavigate();
  const navToPage = (url) => {
    navigate(url);
  };

  const handleNameInput = ({ target }) => {
    setName(target.value);
  };

  const handleEmailInput = ({ target }) => {
    setEmail(target.value);
  };

  const handlePasswordInput = ({ target }) => {
    setPassword(target.value);
  };

  useEffect(() => {
    setNameValidation(REGEX_NAME.test(name));
  }, [name]);

  useEffect(() => {
    setEmailValidation(REGEX_EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordValidation(REGEX_PASS.test(password));
  }, [password]);
  const toast = useToast();
  const handleNewUser = async () => {
    try {
      const { data } = await axios.post('/api/users', {
        name,
        email,
        password,
      });
      console.log('creado! ', data);
      toast({
        position: 'top',
        title: 'Success',
        description: data,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      // limpiando lo input
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      // console.log(error);
      toast({
        position: 'top',
        title: 'Error',
        status: 'error',
        description: error.response.data.error,
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        flexDir='column'
        gap={8}
        p={8}
        maxW='90rem'
        mx='auto'
      >
        <Menu />
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}
        >
          <Stack
            spacing={8}
            mx={'auto'}
            // maxW={'xl'}
            py={12}
            px={6}
          >
            <Stack align={'center'}>
              <Heading
                fontSize={'4xl'}
                textAlign={'center'}
              >
                Registrate
              </Heading>
              <Text
                fontSize={'lg'}
                color={'gray.600'}
              >
                ¡Hola! Bienvenido Al Blog.✌️
              </Text>
            </Stack>
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              boxShadow={'lg'}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl
                      id='firstName'
                      isRequired
                      isInvalid={!nameValidation && name}
                    >
                      <FormLabel>Nombre Apellido</FormLabel>
                      <Input
                        type='text'
                        onChange={handleNameInput}
                        value={name}
                      />
                      {nameValidation ? (
                        ''
                      ) : (
                        <FormHelperText
                          color='red'
                          border='0.5px solid red'
                          margin='0.5rem'
                          padding='1rem'
                        >
                          <p>
                            {' '}
                            Debe comenzar con mayuscula tanto el nombre como
                            apellido
                          </p>
                          <p>
                            1.- Primer caracter en Mayuscula del nombre seguido
                            el resto del nombre en minuscula
                          </p>
                          <p>
                            2.- Primer caracter en Mayuscula deL apellido
                            seguido el resto del nombre en minuscula Merwil
                            Vegas
                          </p>
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Box>
                </HStack>

                <HStack>
                  <FormControl
                    id='email'
                    isRequired
                    isInvalid={!emailValidation && email}
                  >
                    <FormLabel>Correo Electronico</FormLabel>
                    <Input
                      type='email'
                      onChange={handleEmailInput}
                      value={email}
                    />
                  </FormControl>
                </HStack>

                <FormControl
                  id='password'
                  isRequired
                  isInvalid={!passwordValidation && password}
                >
                  <FormLabel>Contraseña</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      onChange={handlePasswordInput}
                      value={password}
                    />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {passwordValidation ? (
                    ''
                  ) : (
                    <FormHelperText
                      color='red'
                      border='0.5px solid red'
                      margin='0.5rem'
                      padding='1rem'
                    >
                      <p>
                        Debe contener al menos una mayuscula, una minuscula, un
                        numero y un caracter especial{' '}
                      </p>
                      <p>1.- Contiene al menos una letra mayúscula ([A-Z]). </p>
                      <p>2.- Contiene al menos una letra minúscula ([a-z]). </p>
                      <p>3.- Contiene al menos un dígito . </p>
                      <p>4.- No tiene espacios en blanco. </p>
                      <p>
                        5.- Contiene al menos un carácter especial que no sea
                        letra ni dígito .{' '}
                      </p>
                      <p>
                        6.- Tiene una longitud total entre 8 y 15 caracteres.{' '}
                      </p>
                    </FormHelperText>
                  )}
                </FormControl>
                <Stack
                  spacing={10}
                  pt={2}
                >
                  <Button
                    colorScheme={'blue'}
                    variant={'solid'}
                    onClick={handleNewUser}
                    isDisabled={
                      !nameValidation || !emailValidation || !passwordValidation
                    }
                  >
                    Resgistro
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Ya eres usuario?{' '}
                    <Link
                      color={'blue.400'}
                      onClick={() => navToPage('/login')}
                    >
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default SignupCard;
