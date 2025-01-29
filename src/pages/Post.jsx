import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  List,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListPost from './ListPost';
import { useAuth } from '../hooks/useAuth.jsx';
const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const [post, setPost] = useState([]);
  const { auth } = useAuth();

  const toast = useToast();
  const handleTitleInput = ({ target }) => {
    setTitle(target.value);
  };
  const handleContentInput = ({ target }) => {
    setContent(target.value);
  };
  // obtener el id de usuario quien inicio sesion
  const fetchUserId = async () => {
    try {
      const { data } = await axios.get('/api/users');
      setUserId(data[0].id);
      // console.log('user id',data[0].id);
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };
  fetchUserId();

  // envio
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(title,content,userId)
    try {
      const response = await axios.post('/api/post', {
        title,
        content,
        userId,
      });
      // console.log('post creado...',response);

      toast({
        position: 'top',
        title: 'Success',
        description: 'Post creado!',
        response,
        status: 'success',
        duration: 4000,
      });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.log(error);
      toast({
        position: 'top',
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    }
  };

  // obtener todo los post
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/api/post');
      // Filtrar los posts que pertenezcan al usuario autenticado
      const filteredPosts = data.filter((post) => post.user.id === auth.id);
      setPost(filteredPosts); // Actualizar el estado con los posts filtrados

      console.log(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    if (auth?.id) {
      fetchPosts();
    }
  }, [auth]);

  // eliminar
  const handleDelete = async (id) => {
    try {
      const data = await axios.delete(`/api/post/${id}`);
      //   console.log(data);
      setPost((data) => data.filter((post) => post.id !== id));

      toast({
        position: 'top',
        title: 'Success',
        description: 'El post ha sido eliminado correctamente.',
        data,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      // fetchPosts();
    } catch (error) {
      console.log(error);
      toast({
        position: 'top',
        title: 'Error',
        description:
          error.response?.data?.message || 'Error al eliminar el post.',
        status: 'error',
        duration: 4000,
      });
    }
  };

  return (
    <SidebarWithHeader>
      {/* formulario */}
      <Flex
        flexDir='column'
        gap={8}
        p={8}
        maxW='90rem'
        mx='auto'
      >
        <Flex
          // minH={'100vh'}
          align={'center'}
          justify={'center'}
          // bg={useColorModeValue('gray.50', 'gray.800')}
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
                Crea tu post
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
              boxShadow={'lg'}
              p={8}
            >
              <Stack
                spacing={4}
                gap={4}
              >
                <HStack>
                  <Box>
                    <Input
                      type='text'
                      placeholder='Título'
                      size='md'
                      variant='filled'
                      isRequired
                      value={title}
                      onChange={handleTitleInput}
                    />

                    <Textarea
                      type='Text'
                      placeholder='Contenido'
                      size='md'
                      variant='filled'
                      isRequired
                      value={content}
                      onChange={handleContentInput}
                    />

                    <Stack spacing={4}>
                      <Button
                        variant='solid'
                        colorScheme='blue'
                        onClick={handleSubmit}
                      >
                        Crear Post
                      </Button>
                    </Stack>
                  </Box>
                </HStack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Flex>
      {/* lista de post */}
      <Flex
        flexDir='column'
        gap={8}
        p={8}
        // maxW='10rem'
        mx='auto'
      >
        {/* <Box
          // spacing={8}
          // mx={'auto'}
          // maxW={'xl'}
          // py={6}
          // px={2}
          > */}
        <Heading
          fontSize={'4xl'}
          textAlign={'center'}
        >
          Mis post ✌️
        </Heading>

        {auth.role === 'user' && (
          <List
            gap={4}
            w={'100%'}
            bg={'gray.200'}
            mx={4}
          >
            {post.length > 0 ? (
              post.map((post) => (
                <Box
                  key={post.id}
                  p={4}
                  mb={4}
                  borderWidth='1px'
                  borderRadius='lg'
                  boxShadow='sm'
                  bg='white'
                  _hover={{ boxShadow: 'md' }}
                >
                  <ListPost
                    post={post}
                    handleDelete={handleDelete}
                  />
                </Box>
              ))
            ) : (
              <Text
                fontSize='lg'
                color='gray.500'
                textAlign='center'
              >
                No tienes posts creados aún. ¡Crea tu primer post! ✨
              </Text>
            )}
          </List>
        )}
        {/* </Box> */}
        {/* </Flex> */}
      </Flex>
    </SidebarWithHeader>
  );
};

export default Post;
