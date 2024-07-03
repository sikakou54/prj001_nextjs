import { Box } from 'native-base'
import React from 'react'
import Image from 'next/image'

export default function Header() {
    return (
        <Box w={'full'} h={'10%'} p={5}>
            <Box w={180} h={20}>
                <Image
                    src={require('../public/brandmark-design.png')}
                    alt='header'
                />
            </Box>
        </Box>
    )
}
