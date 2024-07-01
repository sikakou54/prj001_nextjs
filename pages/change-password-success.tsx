import React from "react";
import {
  Text,
  VStack,
  CheckCircleIcon,
} from "native-base";

export default function App() {
  return (
    <VStack
      w={'full'}
      h={'full'}
      space={2}
      bg={'#f0f4f5'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <CheckCircleIcon
        size={20}
        color={'#8eb2b6'}
      />
      <Text fontSize={'2xl'}>認証成功</Text>
    </VStack>
  );
}
