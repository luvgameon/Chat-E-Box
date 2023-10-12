import { Box, Button, Text } from '@chakra-ui/react'
import React from 'react'
import "../../Pages/Chats.css";
import GroupChatModal from '../Utility/GroupChatModel';
import { AddIcon } from '@chakra-ui/icons';
import TextEditor from './TextEditor';


export default function ChatBox() {
    return (
        <Box className='mychatbox1'
            pb={3}
            px={3}
            marginLeft={2}
            fontSize={{ base: "28px", md: "30px" }}
            fontFamily="Work sans"

            w={"100%"}
            justifyContent={"center"}
            borderRadius={"20px"}
        >
            <Text fontSize="2xl" fontWeight="bold "> My Messages</Text>
            <Box
                pb={6}
                px={3}
                marginLeft={2}
                marginTop={2}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                d="flex"
                w={"100%"}
                justifyContent={'end'}
                borderRadius={"20px"}
                bg={'#DCDCDC'}

                height={"80% "}
            >



            </Box>
            <TextEditor />

        </Box>
    )
}
