import React, { useCallback, useEffect, useState } from "react";
import {
  Heading,
  Box,
  VStack,
  Button,
  Input,
  Text,
  Spinner,
} from "native-base";
import { supabaseAdmin } from "../supabase";
import { useRouter } from "next/dist/client/router";
import { User } from "@supabase/supabase-js";

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
  const [user, setUser] = useState<User | undefined>(undefined)
  const onPress = useCallback(async () => {
    if (validatePassword(password)) {
      if (undefined !== user?.id) {
        const result = await supabaseAdmin.auth.admin.updateUserById(user.id, { password })
        if (result.error) {
          console.error(result.error)
          router.replace('/error')
        } else {
          router.replace('/change-password-success')
        }
      } else {
        router.replace('/error')
      }
    } else {
      setError('8文字以上で大文字・小文字・数字を含む必要があります。')
    }
  }, [user, router, password, confirm])

  const getRefreshTokenFromUrl = (currentUrl: string) => {
    if (currentUrl.includes('refresh_token')) {
      const urlParams = new URLSearchParams(currentUrl.split('#')[1]);
      const refreshToken = urlParams.get('refresh_token');
      if (refreshToken) {
        return refreshToken;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  const onLoad = useCallback(async () => {
    const refresh_token = getRefreshTokenFromUrl(router.asPath)
    if (undefined === refresh_token) {
      router.replace('/error')
    } else {
      const { data } = await supabaseAdmin.auth.refreshSession({ refresh_token })
      if (null !== data && null !== data.user) {
        setUser(data.user)
      } else {
        router.replace('/error')
      }
    }
  }, [router])

  useEffect(() => {
    onLoad()
  }, [router])

  if (undefined !== user) {
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
  } else {
    return (
      <Box
        w={'full'}
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Spinner size={'lg'} />
      </Box>
    )
  }

}
