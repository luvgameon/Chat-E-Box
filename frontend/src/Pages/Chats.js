import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Utility/SideDrawer";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";
import "./Chats.css";

export default function Chats() {
  const { user } = ChatState();

  return <div style={{ width: "100%" }}>
    <SideDrawer />
    <Box className="chat">
      {<MyChats />}
      {<ChatBox />}

    </Box>
  </div>;
}
