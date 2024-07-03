import React from "react";
import {
  Text,
  Box,
} from "native-base";
import Image from 'next/image'

export default function App() {
  return (
    <Box
      w={'full'}
      h={'full'}
      bg={'#f0f4f5'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Image
        src={require('../public/brandmark-design.png')}
        alt='splash'
        width={400}
        height={160}
      />
    </Box>
  )
}
