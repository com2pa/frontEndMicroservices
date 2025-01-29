import { Card, Flex,Text } from '@chakra-ui/react';
import Menu from '../layout/Menu';
import Footer from '../layout/Footer';
import React from 'react';


export const Home = () => {
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

        {/* seccion 1 */}
        <Flex
          gap={4}
          flexDir={{ base: 'column', md: 'column' }}
        >
          <Card
            variant='outline'
            w='100%'
            textAlign='justify'
            justifyContent='center'
            h={'75vh'}
          >
            <Flex
              flexDir='column'
              alignContent='center'
              p={4}
              gap='3rem'
              textAlign={'center'}
            >
              <Text
                color='red.600'
                fontSize={{ base: 25, md: 45 }}
                fontWeight='600'
              >
                Blog with Microservices
              </Text>
            </Flex>
          </Card>    
        </Flex>
        <Footer />
      </Flex>
    </>
  );
};

export default Home;
