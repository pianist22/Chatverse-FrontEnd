
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Header from './Header';
import Title from '../shared/Title';
// import { Grid2 } from '@mui/material';
import { Drawer, Grid2, Skeleton } from '@mui/material';
import { Box, Grid } from '@mui/system';
import ChatList from '../../specific/ChatList';
import { sampleChats } from '../../constants/sampleData';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../../specific/Profile';
import { useMychatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useErrors, useSocketEvents } from '../../hooks/hook.js';
import { getSocket } from '../../socket.jsx';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from '../../constants/events.js';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat.js';
import { getOrSaveFromStorage } from '../../lib/features.js';
import DeleteChatMenu from '../dialogs/DeleteChatMenu.jsx';

const AppLayout = () =>(WrappedComponent) => {
  return (props)=>{
    const params = useParams();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const dispatch = useDispatch();

    const deleteMenuAnchor = useRef(null);

    const socket = getSocket();

    // console.log(socket.id);

    const {isMobile} = useSelector((state)=>state.misc);
    // console.log(isMobile);
    const {user} = useSelector((state)=>state.auth);
    const {newMessagesAlert} = useSelector((state)=>state.chat);
    // console.log(newMessagesAlert);
    const [onlineUsers,setOnlineUsers] = useState([]);

    const {isLoading,data,isError,error,refetch} = useMychatsQuery("");

    useErrors([{isError,error}]);

    useEffect(()=>{
      getOrSaveFromStorage({key:NEW_MESSAGE_ALERT,value:newMessagesAlert});
    },[newMessagesAlert]);

    const handleDeleteChat = (e,chatId,groupChat) =>{
      dispatch(setIsDeleteMenu(true));
      dispatch(setSelectedDeleteChat({chatId,groupChat}));
      deleteMenuAnchor.current = e.currentTarget;
    }
    const handleMobileClose = ()=>{
      dispatch(setIsMobile(false));
    }

    const newMessagesAlertHandler = useCallback((data)=>{
      // console.log(data);
      if(data.chatId === chatId) return;
      dispatch(setNewMessagesAlert(data));
    },[chatId]);

    const newRequestHandler = useCallback(()=>{
      dispatch(incrementNotification());
    },[dispatch]);

    const onlineUsersHandler = useCallback((data)=>{
      console.log(data);
      setOnlineUsers(data);
      console.log(onlineUsers);
    },[]);
    console.log("Online USers",onlineUsers)

    const newRefetchListener = useCallback(()=>{
      refetch();
      navigate("/");
    },[refetch,navigate]);

    const eventHandlers = {
      [NEW_MESSAGE_ALERT]:newMessagesAlertHandler,
      [NEW_REQUEST]:newRequestHandler,
      [REFETCH_CHATS]:newRefetchListener,
      [ONLINE_USERS]:onlineUsersHandler,
    };

    useSocketEvents(socket,eventHandlers);
    return(
      <>
        <Title/>
        <Header />
        <DeleteChatMenu dispatch={dispatch} deleteMenuAnchor={deleteMenuAnchor}/>
        {
          isLoading?(
            <Skeleton/>
          ):
          (
            <Drawer open={isMobile} onClose={handleMobileClose}>
              <ChatList 
              w = '70vw'
              chats={data?.chats} 
              chatId={chatId}
              handleDeleteChat = {handleDeleteChat}
              newMessagesAlert={newMessagesAlert}
              // onlineUsers={onlineUsers}
              />
            </Drawer>
          )
        }
        <Grid
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // marginTop: "4rem", // Adjust margin for a header, if any
      }}
    >
      {/* Left Section */}
      <Grid
        sx={{
          backgroundColor: "#f5f5f5",
          height: "105vh", // Full height minus header
          borderRight: "1px solid #ccc",
          width: {
            xs: "0%", // Hidden on extra-small screens
            sm: "25%", // 1/3 width on small screens
            md: "25%", // 1/4 width on medium screens
            lg: "25%", // 1/6 width on large screens
          },
          display: {
            xs: "none", // Hidden on extra-small screens
            sm: "block", // Visible on small screens and above
          },
        }}
      >
      { 
        isLoading?(<Skeleton/>): 
        (  
        <ChatList chats={data?.chats} 
        chatId={chatId}
        handleDeleteChat = {handleDeleteChat}
        newMessagesAlert={newMessagesAlert}
        // onlineUsers={onlineUsers}
        />)}
      </Grid>

      {/* Center Section */}
      <Grid
        sx={{
          height: "105vh", // Full height minus header
          width: {
            xs: "100%", // Full width on extra-small screens
            sm: "75%", // 2/3 width on small screens
            md: "50%", // Half width on medium screens
            lg: "50%", // 2/3 width on large screens
          },
        }}
      >
        <WrappedComponent {...props} chatId={chatId} user={user}/>
      </Grid>

      {/* Right Section */}
      <Grid
  sx={{
    backgroundColor: "rgba(0,0,0,0.7)",
    height: "105vh", // Full height minus header
    borderLeft: "1px solid #ccc",
    width: {
      xs: "0%", // Hidden on extra-small screens
      sm: "0%", // Hidden on small screens
      md: "25%", // 1/4 width on medium screens
      lg: "25%", // Hidden on large screens
    },
    display: {
      xs: "none", // Hidden on extra-small screens
      sm: "none", // Hidden on small screens
      md: "block", // Visible on medium screens
    },
  }}
>
  <Profile user={user}/>
</Grid>

    </Grid>
    </>
    );
  }
}

export default AppLayout
