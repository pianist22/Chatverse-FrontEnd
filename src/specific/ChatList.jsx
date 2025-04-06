import React from 'react'
import { Stack } from '@mui/material'
import ChatItem from '../components/shared/ChatItem'

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0
    },
  ],
  handleDeleteChat,
}) => {
return (
  <Stack width={w} directions={"column"} overflow={"auto"} height={"100%"}>
  {
      chats?.map((data,index) => {
        const {avatar,_id,name,groupChat,members} = data;

        // console.log(data);

        const newMessageAlert = newMessagesAlert.find(alert => alert.chatId === _id);
        // console.log(newMessageAlert);


        const isOnline = onlineUsers.some(({_id}) => _id === _id);
        // console.log(isOnline);
        // console.log(avatar);
        return <ChatItem
        index={index} 
        newMessageAlert={newMessageAlert} 
        isOnline={isOnline}
        avatar ={avatar}
        name ={name}
        _id ={_id}
        key={_id}
        groupChat ={groupChat}
        sameSender ={chatId === _id}
        handleDeleteChat={handleDeleteChat}
        />
      })
  }

  </Stack>
)
}

export default ChatList