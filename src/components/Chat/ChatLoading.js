import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

export default function ChatLoading() {
    return (
        <Stack >
            <Skeleton height='100px' />
            <Skeleton height='100px' />
            <Skeleton height='100px' />

        </Stack>
    )
}
