import React from "react"
import {
  Text,
  VStack,
  Box,
  WarningIcon,
} from "native-base"
import Image from 'next/image'

export default function App() {
  return (
    <Box w={'full'} h={'full'} bg={'#f0f4f5'}>
      <Box w={'full'} h={'10%'} p={5}>
        <Box w={180} h={20}>
          <Image
            src={require('../public/brandmark-design.png')}
            alt='splash'
          />
        </Box>
      </Box>
      <VStack
        w={'full'}
        h={'90%'}
        space={2}
        bg={'#f0f4f5'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <WarningIcon
          size={20}
          color={'#FF4530'}
        />
        <Text fontSize={'2xl'}>認証エラー</Text>
      </VStack>
    </Box>

  )
}
