import React from 'react'
import {
  Text,
  VStack,
  Box,
  WarningIcon,
} from 'native-base'
import Header from '../component/Header'

export default function App() {
  return (
    <Box w={'full'} h={'full'} bg={'#f0f4f5'}>
      <Header />
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
