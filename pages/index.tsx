import React from "react";
import {
  Text,
  Box,
} from "native-base";
import Image from 'next/image'

export default function App() {
  return (
    <Box w={'full'} h={'full'} bg={'#f0f4f5'}>
      <Box w={'full'} h={'10%'} p={5}>
        <Box w={100} h={20}>
          <Image
            src={require('../public/brandmark-design.png')}
            alt='splash'
          />
        </Box>
      </Box>
    </Box>
  )
}
