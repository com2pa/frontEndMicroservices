import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
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
  const [commentInputs, setCommentInputs] = useState({});
  const [newComment, setNewComment] = useState({});

  // Obtener todos los posts
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_POST}/api/post`
      );

      // const { data } = await axios.get('/api/post');
      // console.log('Datos recibidos en el frontend:', data);
      setPosts(data);
    } catch (error) {
      console.error('Error al cargar los posts:', error);
      setError('Error al cargar los posts.');
    } finally {
      setIsLoading(false);
    }
  };

  // Obtener todos los comentarios en paralelo
  const fetchCommentsForPosts = async () => {
    try {
      const commentsByPost = {};
      const commentsRequests = posts.map((post) =>
        axios
          .get(`${import.meta.env.VITE_API_COMMENT}/api/comment/${post.id}`)
          // .get(`/api/comment/${post.id}`)
          .then((res) => {
            commentsByPost[post.id] = Array.isArray(res.data) ? res.data : [];
          })
      );
      await Promise.all(commentsRequests);
      setNewComment(commentsByPost);
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
    }
  };

  // Manejo de cambio en input de comentario
  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  // Enviar un comentario
  const handleCommentSubmit = async (postId) => {
    if (!commentInputs[postId]?.trim()) return;

    const newCommentData = {
      text: commentInputs[postId],
      postId,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_COMMENT}/api/comment/${postId}`,
        newCommentData
      );
      // const { data } = await axios.post(
      //   `/api/comment/${postId}`,
      //   newCommentData
      // );
      setNewComment((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), data],
      }));

      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error al enviar el comentario:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      fetchCommentsForPosts();
    }
  }, [posts]);

  return (
    <SidebarWithHeader>
      {posts.map((post) => (
        <Box
          key={post.id}
          p={6}
          bg='white'
          borderWidth={1}
          borderRadius='lg'
          shadow='md'
          _hover={{ shadow: 'lg' }}
        >
          {/* ENCABEZADO DEL POST */}
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

          {/* CONTENIDO DEL POST */}
          <Heading
            as='h2'
            size='md'
            mb={2}
            color='blue.600'
          >
            {post.title}
          </Heading>
          <Text
            color='gray.700'
            mb={4}
            fontSize='md'
          >
            {post.content}
          </Text>

          <Box
            borderBottom='1px'
            borderColor='gray.200'
            my={4}
          />
          {/* COMENTARIOS */}
          <VStack
            align='start'
            spacing={3}
            mb={4}
            w='full'
          >
            <Heading
              size='sm'
              color='gray.600'
            >
              Comentarios:
            </Heading>

            {Array.isArray(newComment[post.id]) && newComment[post.id].length > 0 ? (
              newComment[post.id].map((comment, index) => (
                <Box
                  key={index}
                  p={3}
                  bg='gray.100'
                  borderRadius='md'
                  w='full'
                  borderLeft='4px solid blue'
                  _hover={{ bg: 'gray.200' }}
                >
                  <HStack>
                    <Avatar
                      name={comment.user}
                      size='sm'
                    />
                    <Text
                      fontWeight='bold'
                      fontSize='sm'
                    >
                      {comment.user}
                    </Text>
                  </HStack>
                  <Text
                    fontSize='sm'
                    color='gray.700'
                  >
                    {comment.text}
                  </Text>
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

          {/* FORMULARIO PARA AGREGAR COMENTARIOS */}
          <VStack
            spacing={3}
            align='stretch'
          >
            <Textarea
              placeholder='Escribe tu comentario aquí...'
              value={commentInputs[post.id] || ''}
              onChange={(e) => handleCommentChange(post.id, e.target.value)}
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
    </SidebarWithHeader>
  );
};

export default Index;
