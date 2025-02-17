import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const ListPost = ({ post, handleDelete }) => {
  const [comment, setComment] = useState('');
  const [newComment, setNewComment] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleComment = async (e) => {
    e.preventDefault();
    const postId = post.id;
    const text = comment;

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVIDOR_API_COMMENT
        }/api/comment/${postId}`,
        { text }
      );
      // const response = await axios.post(`/api/comment/${postId}`, { text });
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
        `${import.meta.env.VITE_SERVIDOR_API_COMMENT}/api/comment/${postId}`
      );
      // const response = await axios.get(`/api/comment/${postId}`);
      setNewComment(response.data);
    } catch (error) {
      console.log('Error fetching comments ', error);
    }
  }, [post.id]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const handleDeletePost = async () => {
    try {
      await handleDelete(post.id); // Llama a la función de eliminación del padre
      onClose(); // Cierra el modal solo si se elimina correctamente
    } catch (error) {
      console.error('Error al eliminar el post: ', error);
    }
  };

  return (
    <>
      {/* <HStack> */}
      <Flex flexDir={'column'}>
        <Box
          p={4}
          borderWidth='1px'
          borderRadius='lg'
          gap={4}
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
              bg='yellow.500'
            >
              <i> {comment.user}</i>
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
          my={4}
        >
          <FormControl>
            <Flex
              flexDir={'column'}
              justifyContent={'center'}
              gap={4}
            >
              <Input
                placeholder='Agregar comentario...'
                value={comment}
                type='text'
                onChange={(e) => setComment(e.target.value)}
                background={'gray.600'}
                color={'white'}
              />
              <Flex
                flexDir={{ base: 'column', md: 'row' }}
                justifyContent={'center'}
              >
                <Button
                  borderWidth='7px'
                  borderRadius='lg'
                  bg='green'
                  color={'white'}
                  mb={5}
                  onClick={handleComment}
                >
                  Enviar
                </Button>
                <Button
                  borderWidth='7px'
                  borderRadius='xl'
                  bg='red'
                  color={'white'}
                  onClick={onOpen}
                >
                  Eliminar
                </Button>
              </Flex>
            </Flex>
          </FormControl>
        </Box>
      </Flex>
      {/* </HStack> */}
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Eliminar Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>¡Estas seguro de que quiere borrar el post !??</ModalBody>
          <ModalFooter>
            <Button
              variant='solid'
              colorScheme='red'
              onClick={handleDeletePost}
            >
              Confirmar
            </Button>
            <Button
              onClick={onClose}
              ml={3}
              variant='solid'
              colorScheme='blue'
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListPost;
