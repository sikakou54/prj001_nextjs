import React, { useCallback, useEffect, useState } from "react"
import { Heading, Box, VStack, Button, Input, Text, Spinner, CheckCircleIcon } from "native-base"
import { supabaseAdmin } from "../supabase"
import { useRouter } from "next/dist/client/router"
import { User } from "@supabase/supabase-js"
import { getUrlParam, validatePassword } from "../common"
import Image from 'next/image'

const App = () => {
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>(undefined)

  const onLoad = useCallback(async () => {
    const refresh_token = getUrlParam('refresh_token', router.asPath)
    if (undefined === refresh_token) {
      router.replace("/error")
    } else {
      const { data } = await supabaseAdmin.auth.refreshSession({ refresh_token })
      if (null !== data && null !== data.user) {
        setUser(data.user)
      } else {
        router.replace("/error")
      }
    }
  }, [router])

  useEffect(() => {
    onLoad()
  }, [onLoad])

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
      <Box w="full" h="90%" alignItems="center" justifyContent="center">
        {undefined !== user ? (
          <>
            <CheckCircleIcon
              size={20}
              color={'#8eb2b6'}
            />
            <Text fontSize={'2xl'}>認証成功</Text>
          </>
        ) : (
          <Spinner size={'lg'} />
        )}
      </Box>
    </Box>
  )
}

export default App

