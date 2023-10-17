import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Utility/SideDrawer";
import MyChats from "../components/Chat/MyChats";
import ChatBox from "../components/Chat/ChatBox";
import "./Chats.css";
import axios from "axios";

export default function Chats({ }) {
  const [Chatname, setChatname] = useState([]);
  let emptyarray = [];
  const getchatname = async (ChatIDs) => {

    ChatIDs.forEach(async (chat) => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          },
        };
        const res = await axios.post("https://localhost:7059/api/Chats/getchatname", chat,config);
        if (res.status == 200) {

          emptyarray.push(res.data[0]);
          // setChatname(emptyarray);
        }
      } catch (error) {

      }

    });
    setChatname(emptyarray);

  }
 
   useEffect(() => {
    const getchatid = async()=>{
      const config = {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
      };
  
      const senderid = localStorage.getItem("userID");
      console.log("senderid",senderid);
      const res = await axios.post("https://localhost:7059/api/Chats/getchatid", { "SenderID": senderid }, config);
      if (res.status == 200) {  
        getchatname(res.data);
      }

    }
    getchatid();
    
   }, [])
   


  return <div style={{ width: "100%" }}>
    <SideDrawer />
    <Box className="chat">
      {<MyChats chatname={Chatname} />}
      {<ChatBox />}

    </Box>
  </div>;
}
