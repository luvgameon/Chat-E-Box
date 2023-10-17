import { Avatar, Box, Card, CardHeader, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import axios from 'axios';
import { ChatState } from '../../Context/ChatProvider';
import { useDisclosure } from '@chakra-ui/react';


export default function SearchUserCard(props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        user
    } = ChatState();
    const createchathandler = async () => {
        const senderID = localStorage.getItem("userID");
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                },
            };
            console.log('props', props);
            const res = await axios.post("https://localhost:7059/api/Chats/createchat", { "ChatName": props.name, "isGroupChat": false, "userid1": senderID, "userid2": props.ID }, config);
            if (res.status == 200) {
                props.onClose();
                console.log('ress at user', res);

            }

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <Card maxW='md' cursor={"pointer"} colorScheme="black"
                _hover={{
                    background: "grey",
                    color: "black.500",
                }} onClick={createchathandler}>
                <CardHeader >
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
