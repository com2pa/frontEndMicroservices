import {  DeleteIcon } from '@chakra-ui/icons';
import { Box, Button,   Center,  Flex, FormControl,    Heading,    IconButton, Input,  Text } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react';
import { ImPencil2 } from "react-icons/im";


  (async()=>{
  const {data} = await axios.get('/api/servicio')
})();


export const Servicio = () => {

  const[tasks,setTasks] = useState();
  const[newTask,setnewTasks]=useState();

  function handleInputChange(e){
    setnewTasks(e.target.value)
    // console.log(e.target.value)
  }
  function addTask(){

  }
  function editTask(){
    // setIsLoading(true);
    // setError(null);
    // try {
    //   const response = await axios.patch(`/api/servicio/${task._id}`,{
    //     name:editTaskName,
    //     description:editTaskDescription
    //   });
    //   setTasks(tasks.map(t=>t._id===task._id?response.data:t));
    //   setEditTask(null);
    //   setIsLoading(false);
    // } catch (error) {
    //   setError(error.message);
    //   setIsLoading(false);
    // }
  }
  function deleteTask(){
    // setIsLoading(true);
    // setError(null);
    // try {
    //   await axios.delete(`/api/servicio/${task._id}`);
    //   setTasks(tasks.filter(t=>t._id!==task._id));
    //   setIsLoading(false);
    // } catch (error) {
    //   setError(error.message);
    //   setIsLoading(false);
    // }
  }


  // const[editTask,setEditTask]=useState(null);
  // const[editTaskName,setEditTaskName]=useState('');
  // const[editTaskDescription,setEditTaskDescription]=useState('');
  // const[isLoading,setIsLoading]=useState(false);
  // const [error,setError]=useState(null);



  return (
    <>
        <Center bg='white.600' h='100px' w='100%' color='red.600'>
          <Heading>Servicio</Heading>
          
        </Center>

        
          <Flex color='white' marginLeft={10} marginRight={10}>            
            {/* <Square bg='blue.500' w='35%' size='150px'>
              <Flex flexDir="column">
                <Text>Box 2</Text>
                <OrderedList>
                  <ListItem>Lorem ipsum dolor sit amet</ListItem>
                  <ListItem>Consectetur adipiscing elit</ListItem>
                  <ListItem>Integer molestie lorem at massa</ListItem>
                  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
                </OrderedList>

              </Flex>
            </Square> */}
            <Box flex='1'  bg='tomato' alignContent="center">
              <Text mb={5} display="flex" justifyContent="center">Box 3</Text>
              <FormControl>
                <Flex gap='2rem' ml={5} mr={5}  > 
                    <Input 
                      p="1.5rem 2rem" 
                      size="md"  
                      type='text' 
                      placeholder='Nombre del servicio' 
                      value={newTask}
                      onChange={handleInputChange} 
                    />
                    <Button p="1.5rem 2rem"  colorScheme="green" >Registrar</Button>
                      {/* onClick={}  */}
                </Flex>                
              </FormControl>
              {/* <ul >
                {tasks.map((task, index)=>
                  <li key={index}>
                    <Text>{task.name}</Text>
                    <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<ImPencil2 />}
                        onClick={()=>editTask(task)}  
                      />
                    <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                        onClick={()=>deleteTask(task)}  
                      />
                  </li>
                
                )}
              
               
              </ul> */}
            </Box>
          </Flex>

        
        
    </>
  )
}

export default Servicio


