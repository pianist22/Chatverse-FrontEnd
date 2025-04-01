

import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { IconButton, Skeleton, Stack } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import FileMenu from '../components/dialogs/FileMenu';
import AppLayout from '../components/layout/AppLayout';
import MessageComponent from '../components/shared/MessageComponent';
import { InputBox } from '../components/styles/StyledComponents';
import { ALERT, CHAT_JOINED, CHAT_LEAVED, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../constants/events';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { getSocket } from '../socket';
import {useInfiniteScrollTop} from '6pp';
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/Loaders';
import { useNavigate } from 'react-router-dom';



const Chat = ({chatId,user}) => {
  const containerRef =useRef(null);
  const socket = getSocket();
  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const [message,setMessage] = useState("");
  const [messages,setMessages] = useState([]);
  const [page,setPage] = useState(1);
  const [fileMenuAnchor,setFileMenuAnchor] = useState(null);

  const [IamTyping,setIamTyping] = useState(false);
  const [userTyping,setUserTyping] = useState(false);
  // console.log(userTyping);

  const typingTimeout = useRef(null);

  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId});

  const oldMessagesChunk = useGetMessagesQuery({chatId,page});
  
  const members = chatDetails?.data?.chat?.members;
  // console.log(members);
  // console.log(chatDetails?.data?.chat);

  // console.log(messages);

  const {data:oldMessages,setData:setOldMessages} = useInfiniteScrollTop(
    containerRef,
    oldMessagesChunk.data?.totalPages,
    page,
    setPage,
    oldMessagesChunk.data?.messages
  );


  const errors = [
    {isError:chatDetails.isError,error:chatDetails.error},
    {isError:oldMessagesChunk.isError,error:oldMessagesChunk.error},
  ];

  // console.log("OldMessagesChunk",oldMessagesChunk.data);
  // console.log("OldMessages",oldMessages);
  const messageOnChange = (e)=>{
    setMessage(e.target.value);

    if(!IamTyping){
      socket.emit(START_TYPING,{chatId,members});
      setIamTyping(true);
    }
    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING,{chatId,members});
      setIamTyping(false);
    },[2000]);
  }

  const handleFileOpen = (e)=>{
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget);
  } 

  useEffect(()=>{
    socket.emit(CHAT_JOINED,{userId:user._id,members});
    dispatch(removeNewMessagesAlert(chatId));
    return ()=>{
      setMessages([]);
      setMessage("");
      setOldMessages([]);
      setPage(1); 
      socket.emit(CHAT_LEAVED,{userId:user._id,members});
    }
  },[chatId]);

  useEffect(()=>{
    if(bottomRef.current){
      bottomRef.current.scrollIntoView({behavior:"smooth"});
    }
  },[messages]);

  useEffect(()=>{
    if(chatDetails.isError){
      return navigate("/");
    }
  },[chatDetails.isError]);

  const submitHandler = (e)=>{
    e.preventDefault();
  
    if(!message.trim()) return;
    // Emitting messages to the server
    socket.emit(NEW_MESSAGE,{chatId,members,message});
    setMessage("");
  };
  const newMessagesHandler = useCallback((data)=>{
    // console.log(data); 
    if(data.chatId !== chatId)return;
    setMessages((prevMessages)=>[...prevMessages,data.message]);
  },[chatId]);

  const startTypingListener = useCallback((data)=>{
    // console.log(data); 
    if(data.chatId !== chatId)return;
    // console.log("Start Typing",data);
    setUserTyping(true);
  },[chatId]);

  const stopTypingListener = useCallback((data)=>{
    // console.log(data); 
    if(data.chatId !== chatId)return;
    // console.log("Stop Typing",data);
    setUserTyping(false);
  },[chatId]);

  const alertListener = useCallback((data)=>{
    if(data.chatId !== chatId)return;

    const messageForAlert = {
      content: data.message,
      sender: {
        _id: "djasdhajksdhasdsadasdas",
        name: "Admin",
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    setMessages((prevMessages) => [...prevMessages, messageForAlert]);
  },[chatId]);

  const eventHandlers = {
    [ALERT]:alertListener,
    [NEW_MESSAGE]:newMessagesHandler,
    [START_TYPING]:startTypingListener,
    [STOP_TYPING]:stopTypingListener
  };

  useSocketEvents(socket,eventHandlers);

  useErrors(errors);

  const allMessages = [...oldMessages,...messages];

  // const fileMenuRef = useRef(null);
  return chatDetails.isLoading? <Skeleton/> : (
    <>
    <Stack ref={containerRef}
     boxSizing={"border-box"}
     padding={"1rem"}
     spacing={"1rem"}
     backgroundColor={"#D3D3D3"}
     height={"90%"}
     sx={{
      overflowX:"hidden",
      overflowY:"auto",
     }}
     >      
      {
        allMessages.map((i)=>(
          <MessageComponent key={i._id} message={i} user={user}/>
        ))
      }

      {userTyping && <TypingLoader/>}

      <div ref={bottomRef}/>
    </Stack>
    <form style={{
      height:"10%",
    }} 
    onSubmit={submitHandler}
    >
      <Stack 
      direction={"row"} 
      height={"100%"} 
      padding={"0.5rem"}
      alignItems={"center"}
      position={"relative"}
      >
        <IconButton 
        sx={{
          position:"absolute",
          left:"1.5rem",
          rotate:"30deg",
        }}
        onClick={handleFileOpen}
        >
          <AttachFileIcon/>
        </IconButton>

        <InputBox placeholder='Type Your Message Here...' value={message} onChange={messageOnChange} sx={{
          padding:"0 5rem",
        }}/>

        <IconButton 
        type="submit"
        sx={{
          rotate:"-30deg",
          backgroundColor:"#ea7070",
          color:"white",
          marginLeft:"1rem",
          padding:"0.5rem",
          "&:hover":{
            bgcolor:"error.dark",
          }
        }}
        >
          <SendIcon />
        </IconButton>

      </Stack>
    </form>
    <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
    </>
  )
}

export default AppLayout()(Chat);