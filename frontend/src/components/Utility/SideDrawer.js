import { Avatar, Box, Button, CloseButton, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Stack, Text, Tooltip } from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from "../../Context/ChatProvider";
import ProfileModel from './ProfileModel';
import { useDisclosure } from '@chakra-ui/react';
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import SearchUserCard from './SearchUserCard';



export default function SideDrawer() {
    const [Search, setSearch] = useState("");
    const [SearchResult, setSearchResult] = useState([]);
    const [Loading, setLoading] = useState(false);

    const [LoadingChat, setLoadingChat] = useState();
    const {
        user
    } = ChatState();
    const history = useHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    //Search User

    const SerachUsers = async () => {
        setLoadingChat(true);
        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };


            const res = await axios.post("https://localhost:7059/api/Registration/getbyname", { "name": Search }, config);
            if (res.status == 200) {
                console.log(res.data);
                setSearchResult(res.data);
                setTimeout(() => {
                    setLoadingChat(false);
                }, 500);
            }

        } catch (error) {
            console.log(error);
            setLoadingChat(false);

        }
    }

    // Logout Handler
    const Logouthandler = async () => {
        localStorage.clear();
        history.replace('/');

    }
    return (
        <div>
            <Box p='5px 5px 5px 5px' style={{ border: "solid 2px rgb(92, 91, 91)", display: "flex", justifyContent: "space-between" }}>
                <Tooltip label="Search User to Chat"
                    hasArrow
                    placement='bottom-end'>
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"> </i>&nbsp;
                        Search User
                    </Button>
                </Tooltip>
                <Text fontSize="3xl" fontFamily="Work sans">
                    Chat-E-Box
                </Text>
                <div>

                    <Menu>

                        <MenuButton p={1} >
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                    </Menu>
                    <Menu>

                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.email}

                            />

                        </MenuButton>
                        <MenuList pl={2}>
                            <ProfileModel>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModel>
                            <MenuItem onClick={Logouthandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>


            </Box>
            <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={'sm'}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px" display={'flex'} justifyContent={'space-between'}>Search Users <Stack direction='row' spacing={6}>
                        <CloseButton size='lg' onClick={onClose} />
                    </Stack></DrawerHeader>

                    <DrawerBody>
                        <Box style={{ display: "flex" }}>
                            <Input
                                placeholder="Search Users"
                                mr={2}
                                value={Search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={SerachUsers}
                            />

                        </Box>
                        {LoadingChat && <Spinner ml="auto" d="flex" p={3} />}
                        {console.log(SearchResult)}
                        {SearchResult.length > 0 && <Stack p="40px 10px 10px 10px" >
                            {SearchResult.map((user) => (
                                <SearchUserCard key={user.userID} name={user.name} pic={user.pic} email={user.email} ID={user.userID} />
                            ))}
                        </Stack>
                        }


                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </div>
    )
}
