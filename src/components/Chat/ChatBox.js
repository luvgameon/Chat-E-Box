import { Box, Button, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import "../../Pages/Chats.css";
import GroupChatModal from '../Utility/GroupChatModel';
import { AddIcon } from '@chakra-ui/icons';
import TextEditor from './TextEditor';
import axios from 'axios';
import MessageBox from '../Utility/MessageBox';


export default function ChatBox() {
    const [messages, setmessages] = useState([]);
    const ConversationID = 1008;
    const fetchmsg = async () => {
        const config = {
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        };

        try {
            const res = await axios.post('https://localhost:7059/api/Chats/getmsg', { "ConversationID": ConversationID }, config);
            console.log(res);
            setmessages(res.data);

        } catch (error) {

        }

    }
    useEffect(() => {
        fetchmsg();

    }, [])
 console.log('messages',messages);
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
                {messages.map((msg) => (
                            <MessageBox message={msg.content}/>
                        ))}



            </Box>
            <TextEditor />

        </Box>
    )
}
