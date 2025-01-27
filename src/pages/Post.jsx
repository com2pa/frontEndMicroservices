import { Box, Button, Flex, Heading, HStack, Input, List, Stack, Text, Textarea, useToast } from '@chakra-ui/react'
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader'
import axios from 'axios';
import { useEffect, useState } from 'react';
import ListPost from './ListPost';

const Post = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [post,setPost]=useState([])
    
    const toast=useToast();
    const handleTitleInput =({target})=>{
        setTitle(target.value);
    };
    const handleContentInput = ({target})=>{
        setContent(target.value);
    };
    // obtener el id de usuario quien inicio sesion  
    const fetchUserId = async () => {
        try {
            const {data} = await axios.get('/api/users'); 
            setUserId(data[0].id);  
            // console.log('user id',data[0].id);        
       
        } catch (error) {
            console.error('Error fetching user ID:', error);
        }
    };  
    fetchUserId()


    
// envio 
    const handleSubmit = async (e) => {    
           
        e.preventDefault();       
       
        // console.log(title,content,userId)
        try {
            const response = await axios.post('/api/post', {
                title,
                content,
                userId
                
            });
            // console.log('post creado...',response);
            // history.push('/');
            toast({
                position:'top',
                title: 'Success',
                description: 'Post creado!',response,
                status:'success',
                duration:4000,
            });
            setTitle('');
            setContent('');
            fetchPosts();
            
        } catch (error) {
            console.log(error)
            toast({
                position:'top',
                title: 'Error',
                description: error.message,
                status:'error',
                duration:4000,
            })
        }
    };

    // obtener todo los post
    const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/api/post');
      setPost(data);
    //   console.log(data)
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <SidebarWithHeader>
        {/* formulario */}
        <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">
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
                    px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Crea  tu post
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            ¡Hola! Bienvenido Al Blog.✌️
                        </Text>             
                    
                    </Stack>
                    <Box
                    rounded={'lg'}
                    // bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    
                    >
                        <Stack spacing={4} gap={4}>
                            <HStack>
                                <Box>
                                    
                                    <Input
                                        type='text' 
                                        placeholder="Título" 
                                        size="md"
                                        variant="filled"
                                        isRequired
                                        value={title}
                                        onChange={handleTitleInput}                                        
                                    />
                                    
                                    <Textarea
                                        type='Text' 
                                        placeholder="Contenido" 
                                        size="md"
                                        variant="filled"
                                        isRequired
                                        value={content}
                                        onChange={handleContentInput}
                                    />
                                    
                                    <Stack spacing={4}>
                                        <Button 
                                            variant="solid" 
                                            colorScheme="blue"
                                             onClick={handleSubmit}
                                        >Crear Post</Button>
                                    </Stack>

                                </Box>
                            </HStack>
                         </Stack>   
                    </Box>
                </Stack>
            </Flex>
        </Flex>
        {/* lista de post */}
        <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">
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
                    px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                           Mis post ✌️
                        </Heading>
                                    
                    
                    </Stack>
                    <Box
                    rounded={'lg'}
                    // bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}
                    
                    >
                        <Stack spacing={4} gap={4}>
                            <HStack>
                               {/* {post.map(post => (
                                <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg">
                                    <Heading fontSize={'xl'}>{post.title}</Heading>
                                    <Text>{post.content}</Text>
                                </Box>
                                ))} */}
                                <List>
                                    
                                    {post.map(post => (
                                        <ListPost 
                                            key={post.id} 
                                            post={post}
                                             

                                        />
                                    ))}
                                </List>
                            </HStack>
                         </Stack>   
                    </Box>
                </Stack>
            </Flex>
        </Flex>        
    </SidebarWithHeader>
  )
}

export default Post
