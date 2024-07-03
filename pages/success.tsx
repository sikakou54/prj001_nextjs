import React, { useCallback, useEffect, useState } from "react"
import {
  Box,
  VStack,
  Text,
  Spinner,
  CheckCircleIcon,
} from "native-base"
import { supabaseAdmin } from "../supabase"
import { useRouter } from "next/dist/client/router"
import { User } from "@supabase/supabase-js"
import { getUrlParam } from "../common"

export default function App() {
  const router = useRouter()
  const [user, setUser] = useState<User | undefined>(undefined)

  const onLoad = useCallback(async () => {
    const refresh_token = getUrlParam('refresh_token', router.asPath)
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
  }, [onLoad])

  if (undefined !== user) {
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
    )
  } else {
    return (
      <Box
        w={'full'}
        h={'full'}
        alignItems={'center'}
        justifyContent={'center'}
        bg={'#f0f4f5'}
      >
        <Spinner size={'lg'} />
      </Box>
    )
  }

}
