import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Alert,
  AlertIcon,
  Avatar,
  Button,
  Textarea,
} from '@chakra-ui/react';
import SidebarWithHeader from '../pagesPrivate/LayoutPrivate/SidebarWithHeader';
import axios from 'axios';

export const Index = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentInputs, setCommentInputs] = useState({}); // Para manejar comentarios por post
  const [newComment, setNewComment] = useState([]);
  
  // Obtener todos los posts
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/api/post');
      setPosts(data); // Actualizar el estado con los posts
    } catch (error) {
      setError('Error al cargar los posts.');
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  // Manejar el cambio en el campo de comentario
  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  // Manejar el envío de un comentario
  const handleCommentSubmit = async (postId) => {
    const newComment = {
      text: commentInputs[postId], // Comentario ingresado
      postId: postId,
    };

    try {
      const { data } = await axios.post(`/api/comment/${postId}`, newComment);

      // Actualiza el estado local para incluir el nuevo comentario
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), data] }
            : post
        )
      );
      // Actualizar el estado de comentarios organizados por post
      setNewComment((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), data], // Añadir al arreglo del post correspondiente
      }));
      // Limpia el campo de comentario
      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // todos los comentarios
  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      try {
        const commentsByPost = {}; // Objeto para almacenar comentarios por post
        for (const post of posts) {
          const response = await axios.get(`/api/comment/${post.id}`); // Obtener comentarios del post específico
          commentsByPost[post.id] = response.data; // Guardar en el objeto
        }
        setNewComment(commentsByPost); // Actualizar estado con comentarios organizados por post
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (posts.length > 0) {
      fetchCommentsForPosts(); // Solo ejecuta cuando hay posts cargados
    }
  }, [posts]); // Se ejecuta cuando los posts cambian

  return (
    <SidebarWithHeader>
      <Box p={8}>
        <Heading
          as='h1'
          size='xl'
          mb={6}
          textAlign='center'
        >
          Todos los Posts
        </Heading>

        {isLoading ? (
          <HStack
            justifyContent='center'
            py={8}
          >
            <Spinner
              size='xl'
              color='blue.500'
            />
          </HStack>
        ) : error ? (
          <Alert
            status='error'
            mb={6}
          >
            <AlertIcon />
            {error}
          </Alert>
        ) : posts.length === 0 ? (
          <Text
            fontSize='lg'
            textAlign='center'
            mt={6}
          >
            No hay posts disponibles.
          </Text>
        ) : (
          <VStack
            spacing={6}
            align='stretch'
          >
            {posts.map((post) => (
              <Box
                key={post.id}
                p={6}
                borderWidth={1}
                borderRadius='lg'
                shadow='md'
                _hover={{ shadow: 'lg' }}
              >
                <HStack
                  spacing={4}
                  mb={4}
                >
                  <Avatar
                    name={post.user?.name || 'Usuario desconocido'}
                    size='md'
                  />
                  <Text
                    fontWeight='bold'
                    fontSize='lg'
                  >
                    {post.user?.name || 'Usuario desconocido'}
                  </Text>
                </HStack>
                <Heading
                  as='h2'
                  size='md'
                  mb={2}
                >
                  {post.title}
                </Heading>
                <Text
                  color='gray.600'
                  mb={4}
                >
                  {post.content}
                </Text>

                {/* Comentarios existentes */}
                <VStack
                  align='start'
                  spacing={3}
                  mb={4}
                >
                  <Heading size='sm'>Comentarios:</Heading>
                  {newComment[post.id]?.length > 0 ? (
                    newComment[post.id].map((comment, index) => (
                      <Box
                        key={index}
                        p={3}
                        bg='gray.100'
                        borderRadius='md'
                        w='full'
                      >
                        <HStack>
                          <Avatar
                            name={comment.user}
                            size='sm'
                          />
                          <Text fontWeight='bold'>{comment.user}</Text>
                        </HStack>
                        <Text fontSize='sm'>{comment.text}</Text>
                      </Box>
                    ))
                  ) : (
                    <Text
                      fontSize='sm'
                      color='gray.500'
                    >
                      No hay comentarios aún.
                    </Text>
                  )}
                </VStack>

                {/* Formulario para añadir un comentario */}
                <VStack
                  spacing={3}
                  align='stretch'
                >
                  <Textarea
                    placeholder='Escribe tu comentario aquí...'
                    value={commentInputs[post.id] || ''}
                    onChange={(e) =>
                      handleCommentChange(post.id, e.target.value)
                    }
                  />
                  <Button
                    colorScheme='blue'
                    onClick={() => handleCommentSubmit(post.id)}
                    isDisabled={!commentInputs[post.id]?.trim()}
                  >
                    Enviar comentario
                  </Button>
                </VStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </SidebarWithHeader>
  );
};

export default Index;
