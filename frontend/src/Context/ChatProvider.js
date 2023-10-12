import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [user, setuser] = useState([]);
    const [token, settoken] = useState("");
    const [Chats, setChats] = useState();
    const [SelectChats, setSelectChats] = useState();


    useEffect(async () => {

        const email = JSON.parse(localStorage.getItem("email"));
        const token = JSON.parse(localStorage.getItem("token"));


        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };


        const res = await axios.post("https://localhost:7059/api/Registration/getbyemail", { "email": email }, config);
        if (res.status == 200) {
            setuser(res.data);

        }

        // const obj = {
        //     "email": email,
        //     "token": token
        // }
        // setuser(obj);





    }, [])

    return (

        <ChatContext.Provider value={{ user, setuser, Chats, setChats, SelectChats, setSelectChats }}>{children}</ChatContext.Provider>
    )

}

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
