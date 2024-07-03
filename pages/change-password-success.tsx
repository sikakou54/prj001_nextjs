import React from 'react'
import {
  Text,
  VStack,
  CheckCircleIcon,
  Box,
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
        <CheckCircleIcon
          size={20}
          color={'#8eb2b6'}
        />
        <Text fontSize={'2xl'}>パスワード変更完了</Text>
      </VStack>
    </Box>

  )
}
