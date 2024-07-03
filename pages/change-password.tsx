import React, { useCallback, useEffect, useState } from 'react'
import { Heading, Box, VStack, Button, Input, Text, Spinner } from 'native-base'
import { supabaseAdmin } from '../supabase'
import { useRouter } from 'next/dist/client/router'
import { User } from '@supabase/supabase-js'
import { getUrlParam, validatePassword } from '../common'
import Header from '../component/Header'

const App = () => {
  const router = useRouter()
  const [password, setPassword] = useState<string>('')
  const [confirm, setConfirm] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [user, setUser] = useState<User | undefined>(undefined)

  const onPress = useCallback(async () => {
    if (validatePassword(password)) {
      if (user?.id) {
        const result = await supabaseAdmin.auth.admin.updateUserById(user.id, { password })
        if (result.error) {
          console.error(result.error)
          router.replace('/error')
        } else {
          router.replace('/change-password-success')
        }
      } else {
        console.error('user is undefined', user)
        router.replace('/error')
      }
    } else {
      setError('8文字以上で大文字・小文字・数字を含む必要があります。')
    }
  }, [user, router, password])

  const onLoad = useCallback(async () => {
    const refresh_token = getUrlParam('refresh_token', router.asPath)
    if (undefined === refresh_token) {
      console.error('refresh_token is undefined', refresh_token)
      router.replace('/error')
    } else {
      const { data } = await supabaseAdmin.auth.refreshSession({ refresh_token })
      if (null !== data && null !== data.user) {
        setUser(data.user)
      } else {
        console.error('user is null', data)
        router.replace('/error')
      }
    }
  }, [router])

  useEffect(() => {
    onLoad()
  }, [onLoad])

  return (
    <Box w={'full'} h={'full'} bg={'#f0f4f5'}>
      <Header />
      <Box w={'full'} h={'90%'} alignItems={'center'} justifyContent={'center'}>
        {undefined !== user ? (
          <>
            <VStack w={300} space={2} mb={5}>
              <Heading w={'full'} size={'sm'}>新しいパスワード</Heading>
              <Input size={'md'} onChangeText={text => setPassword(text)} secureTextEntry={true} />
              <Heading w={'full'} size={'sm'}>パスワード(確認)</Heading>
              <Input size={'md'} onChangeText={text => setConfirm(text)} secureTextEntry={true} />
              {error && (
                <Text fontSize={'xs'} color={'#FF4530'}>{error}</Text>
              )}
            </VStack>
            <Button
              onPress={onPress}
              w={300}
              fontsize={'md'}
              isDisabled={password === '' || confirm === '' || password !== confirm}
              bg={'#8eb2b6'}
            >送信</Button>
          </>
        ) : (
          <Spinner size={'lg'} color={'#8eb2b6'} />
        )}
      </Box>
    </Box>
  )
}

export default App
