'use client'

import {
  Box,
  chakra,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { ReactNode } from 'react'
import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
const Logo = (props: any) => {
  return (
    <Heading color="red.600" shadow="dark-lg "p='1' rounded='sm'  bg='white'>NURSING AT HOME</Heading>

  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (

    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function SmallCentered() {
  return (
      <Stack
        borderTopWidth={1}
        borderStyle={'solid'}
        // borderColor={useColorModeValue('gray.200', 'gray.700')}
        color={useColorModeValue('red.600', 'red.300')}
        bg={useColorModeValue('white', 'White.300')}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
        fontSize={{base:15,sm:15,md:15,lg:17,xl:20}}
        >
          <Text>© 2024 Ingeniero Merwil Vegas. Todos los derechos reservados </Text>
        </Stack>
  )
}