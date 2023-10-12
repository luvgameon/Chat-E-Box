import React, { useContext } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import "../../Pages/Chats.css";
import ChatLoading from './ChatLoading';
import GroupChatModal from '../Utility/GroupChatModel';

export default function MyChats() {
    const { Chats, setChats, SelectChats, setSelectChats } = ChatState();
    return (
        <Box
            d={{ base: SelectChats ? "none" : "flex", md: "flex" }}
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius={"20px"}
            borderWidth="1px"
        >
            <Box className='mychatbox'
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                borderRadius={"20px"}>
                <Text fontSize="2xl" fontWeight="bold ">My Chats</Text>
                <GroupChatModal>
                    <Button
                        d="flex"
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<AddIcon />} p={3}>
                        New Group Chat
                    </Button>
                </GroupChatModal>
            </Box>
            <Box style={{ height: "200px" }}
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="100%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {Chats ? (
                    <Stack overflowY="scroll">
                        {Chats.map((chat) => (
                            <Box
                                onClick={() => setSelectChats(chat)}
                                cursor="pointer"
                                bg={SelectChats === chat ? "#38B2AC" : "#E8E8E8"}
                                color={SelectChats === chat ? "white" : "black"}
                                px={3}
                                py={2}
                                borderRadius="lg"
                                key={chat._id}
                            >
                                <Text>
                                    Luv Chats
                                </Text>
                            </Box>
                        ))}
                    </Stack>
                ) : (
                    <ChatLoading />
                )}

            </Box>
        </Box>

    )
}
