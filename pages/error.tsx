import React from "react";
import {
  Text,
  VStack,
  WarningIcon,
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
      <WarningIcon
        size={20}
        color={'#FF4530'}
      />
      <Text fontSize={'2xl'}>認証エラー</Text>
    </VStack>
  );
}
