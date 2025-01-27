
import {  Card,  Flex,Image,    Text,  } from "@chakra-ui/react";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
// import { useNavigate } from "react-router-dom";
import React  from "react";
import Educacion from '../assets/educacion.jpg';


export const Home = () => {  
  return (    
    <>
      <Flex flexDir="column" gap={8} p={8} maxW="90rem" mx="auto">
        <Menu />
      
        {/* seccion 1 */}
        <Flex gap={4} flexDir={{ base: 'column', md: 'row', }} > 
          <Card variant="outline" w="100%" textAlign="justify" justifyContent="center">
            <Flex flexDir="column" alignContent="center"p={4}  gap="3rem">
              <Text color="red.600" fontSize={{ base: 25, md: 45}} fontWeight="600">                
                Blog with Microservices                 
              </Text>
                         
            </Flex>
          </Card>
          <Card 
            variant="outline" 
            width="100%" 
            height="100%" 
            display={{base: 'column', md: 'block'}}
          >
            <Image 
              src={Educacion}               
              alt="educacion" 
              // height={'100%'} 
              objectFit="cover" 
              w="100%"  /> 
          </Card>
        </Flex> 
        {/* seccion 2 */}
        {/* <Flex gap="1rem" flexDir={{base: 'column', md: 'row'}}  >
          <Flex flexDir={{ base: "column", md: 'row'}}  w="100%" gap={4} align="center">
            <Card p={4} display="flex" variant="outline" w="100%" height="100%" flexDir="column" gap={4} justifyContent="center">
              <Text color="red.600" fontSize={{ base: 25, md: 45}} fontWeight="600">
                Actividades
               
              </Text>
              <Text>
                
                
              </Text>
            </Card>
          </Flex>
        </Flex> */}
        
      
      
        <Footer/>     
      </Flex>
    </>
  );
};

export default Home;