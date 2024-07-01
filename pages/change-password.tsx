import React, { useCallback, useState } from "react";
import {
  Heading,
  Box,
  VStack,
  Button,
  Input,
  Text,
} from "native-base";
import { supabaseAdmin } from "../supabase";
import { useRouter } from "next/dist/client/router";

function validatePassword(str: string) {

  // 大文字、小文字、数字がそれぞれ1文字以上含まれているかチェック
  const uppercaseRegex = /[A-Z]/
  const lowercaseRegex = /[a-z]/
  const numberRegex = /\d/

  const hasUppercase = uppercaseRegex.test(str)
  const hasLowercase = lowercaseRegex.test(str)
  const hasNumber = numberRegex.test(str)

  // 条件を満たしているか確認
  if (hasUppercase && hasLowercase && hasNumber && str.length >= 8) {
    return true
  } else {
    return false
  }
}

export default function App() {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [error, setError] = useState<string>('')
  //const [text, setText] = useState<any>('')
  const onPress = useCallback(() => {
    if (validatePassword(password)) {
      resetUserPassword(router.asPath, password)
    } else {
      setError('8文字以上で大文字・小文字・数字を含む必要があります。')
    }
  }, [router.asPath, password, confirm])

  const getRefreshTokenFromUrl = (currentUrl: string) => {
    if (currentUrl.includes('refresh_token')) {
      const urlParams = new URLSearchParams(currentUrl.split('#')[1]);
      const refreshToken = urlParams.get('refresh_token');
      return refreshToken;
    } else {
      return undefined;
    }
  };

  async function resetUserPassword(url: string, password: string) {
    const refresh_token = getRefreshTokenFromUrl(url)
    if (refresh_token) {
      const { data } = await supabaseAdmin.auth.refreshSession({ refresh_token })
      if (null !== data && null !== data.user && null !== data.user.id) {
        const result = await supabaseAdmin.auth.admin.updateUserById(data.user.id, { password })
        if (result.error) {
          console.error(result.error)
        } else {
          router.replace('/success')
        }
      } else {
        router.replace('/error')
      }
    } else {
      router.replace('/error')
    }
  }

  return (
    <Box
      w={'full'}
      h={'full'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <VStack
        w={300}
        space={2}
        mb={5}
      >
        <Heading
          w={'full'}
          size={'sm'}
        >新しいパスワード</Heading>
        <Input size={'md'} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        {/*<Text>{password}</Text>*/}
        <Heading
          w={'full'}
          size={'sm'}
        >パスワード(確認)</Heading>
        <Input size={'md'} onChangeText={(text) => setConfirm(text)} secureTextEntry={true} />
        {/*<Text>{confirm}</Text>*/}
        {'' !== error && (
          <Text
            fontSize={'xs'}
            color={'#FF4530'}
          >{error}</Text>
        )}
      </VStack>

      <Button
        onPress={onPress}
        w={300}
        fontSize={'md'}
        isDisabled={password === '' || confirm === '' || password !== confirm}
      >送信</Button>
    </Box>
  );
}
