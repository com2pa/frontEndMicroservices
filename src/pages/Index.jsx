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
import SidebarWithHeader from '@/pagesPrivate/LayoutPrivate/SidebarWithHeader';
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
      setPosts(data);
    } catch (error) {
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
          .get(
            `${
              import.meta.env.VITE_API_COMMENT
            }/api/comment/${post.id}`
          )
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
        `${
          import.meta.env.VITE_API_COMMENT
        }/api/comment/${postId}`,
        newCommentData
      );

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
                  {Array.isArray(newComment[post.id]) &&
                  newComment[post.id].length > 0 ? (
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
