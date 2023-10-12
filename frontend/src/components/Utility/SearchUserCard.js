import { Avatar, Box, Card, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function SearchUserCard(props) {
    return (
        <>
            <Card maxW='md' cursor={"pointer"} colorScheme="black"
                _hover={{
                    background: "grey",
                    color: "black.500",
                }} >
                <CardHeader>
                    <Flex spacing='4'>
                        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                            <Avatar name={props.name} src={props.pic} />

                            <Box>
                                <Heading size='sm'>{props.name}</Heading>
                                <Text>{props.email}</Text>
                            </Box>
                        </Flex>
                    </Flex>
                </CardHeader>
            </Card>
        </>
    )
}
