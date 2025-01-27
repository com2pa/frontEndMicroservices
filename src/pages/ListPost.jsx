import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
  Card,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const ListPost = ({ post }) => {
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState([]);
  // console.log(newComment)
  const toast = useToast();

  const handleComment = async (e) => {
    e.preventDefault();
    const postId = post.id;
    const text = comment;

    try {
      const response = await axios.post(
        `http://localhost:5000/api/comment/${postId}`,
        { text }
      );
      // Actualiza la lista de comentarios
      setNewComment((prevComments) => [...prevComments, response.data]);
      console.log('comentario agregado ');
      toast({
        position: 'top',
        title: 'Comentario agregado',
        description: 'Comentario agregado correctamente',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });

      setComment('');
    } catch (error) {
      console.log('Error al agregar comentario ', error);
      toast({
        position: 'top',
        title: 'Error',
        status: 'error',
        description: error.response?.data?.error,
        duration: 4000,
        isClosable: true,
      });
    }
  };

  // todos los comentarios

  const fetchComment = useCallback(async () => {
    const postId = post.id;
    try {
      const response = await axios.get(
        `http://localhost:5000/api/comment/${postId}`
      );
      setNewComment(response.data);
    } catch (error) {
      console.log('Error fetching comments ', error);
    }
  }, [post.id]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  return (
    <>
      <HStack>
        <Flex flexDir={'column'}>
          <Box
            p={4}
            borderWidth='1px'
            borderRadius='lg'
          >
            <Heading fontSize={'xl'}>{post.title}</Heading>
            <Text>{post.content}</Text>
          </Box>
          {Array.isArray(newComment) && newComment.length > 0 ? (
            newComment.map((comment) => (
              <Box
                key={comment.id}
                p={4}
                borderWidth='1px'
                borderRadius='lg'
                bg='gray.500'
              >
                <Text>{comment.text}</Text>
              </Box>
            ))
          ) : (
            <i>No hay comentarios aún.</i>
          )}

          <Box
            p={4}
            borderWidth='7px'
            borderRadius='lg'
            bg='gray.200'
          >
            <FormControl>
              <Flex
                flexDir={'column'}
                justifyContent={'center'}
                gap={5}
              >
                <Input
                  placeholder='Agregar comentario...'
                  value={comment}
                  type='text'
                  onChange={(e) => setComment(e.target.value)}
                  background={'gray.600'}
                  color={'white'}
                />
                <Button
                  borderWidth='7px'
                  borderRadius='lg'
                  bg='green.200'
                  mb={5}
                  onClick={handleComment}
                >
                  Enviar
                </Button>
              </Flex>
            </FormControl>
          </Box>
        </Flex>
      </HStack>
    </>
  );
};

export default ListPost;
