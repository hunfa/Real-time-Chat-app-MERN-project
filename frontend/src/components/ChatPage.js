import React, { useContext, useEffect, useState } from 'react'
import { Heading, Container } from '@chakra-ui/react'
import { chatContext } from "../context/chatsState"
import MyChats from './MyChats';
import ChatBox from './ChatBox';

function ChatPage() {
    const [selectedChat, setselectedChat] = useState()
    const context = useContext(chatContext);

    useEffect(() => {
        //   console.log("fecthchats runs")
        context.fetchChats();
        // eslint-disable-next-line
    }, [])// error in this line 
    
    const _setselectedChat=(chat_id)=>{
        // console.log("clicked")
        setselectedChat(chat_id);
    }
   

    return (
        <>
            <Heading textAlign={"center"}>My Chats</Heading>
            <Container maxW='1000px'>
                {context.chats.length > 0 ?

                    context.chats.map((element, index) => {
                        return (<MyChats  key={index} chat={element} _setselectedChat={_setselectedChat} selectedChat={selectedChat} />);
                    })
                    : "No Chats Yet"}
                <ChatBox selectedChat={selectedChat}/>
            </Container>
        </>
    )

}

export default ChatPage