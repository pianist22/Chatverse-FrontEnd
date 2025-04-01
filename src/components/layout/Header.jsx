

import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { lazy, Suspense, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orange } from '../../constants/colors';
import { server } from '../../constants/config';
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile,  setIsNewGroup,  setIsNotification,  setIsSearch } from "../../redux/reducers/misc";
import { resetNotificationCount } from "../../redux/reducers/chat";
// import Search from '../../specific/Search';

const SearchDialog = lazy(() => import('../../specific/Search'));
const NotificationDialog = lazy(() => import('../../specific/Notifications'));
const NewGroupDialog = lazy(() => import('../../specific/NewGroup'));

const Header = () => {
  const navigate = useNavigate(); 
  const dispatch = useDispatch();
  const {isSearch,isNotification,isNewGroup} = useSelector(state=>state.misc);
  const {notificationCount} = useSelector((state)=>state.chat);
  // const [isNewGroup,setIsNewGroup] = useState(false); 

  const handleMobile = ()=> {
    console.log("Mobile");
    dispatch(setIsMobile(true));

  }
  const openSearchDialogBox = ()=> {
    console.log("search");
    dispatch(setIsSearch(true));
  }
  const openNewGroup = ()=> {
    console.log("new group");
    dispatch(setIsNewGroup(true));
  }
  const openNotification = ()=> {
    dispatch(setIsNotification(true));
    dispatch(resetNotificationCount());
  }
  const navigateToGroup = ()=> navigate("/groups");

  const logoutHandler = async() => {
    try{
      const {data} = await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true});
      dispatch(userNotExists());
      toast.success(data.message);
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Something went Wrong!!");
    }
  }
  return (
    <>
      <Box sx = {{flexGrow:1}} height={"4rem"}>
        <AppBar position="static" sx={{bgcolor:orange}}>
          <Toolbar>
            <Typography 
              variant="h6"
              sx = {{
                display:{
                  xs:"none",
                  sm:"block"
                },
              }}
            >
              ChatVerse
            </Typography>
            <Box
              sx = {{
                display:{
                  xs:"block",
                  sm:"none"
                },
              }}          
            >
              <IconButton color='inherit' onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box 
            sx={{
              flexGrow:1,
              display:"flex",
              justifyContent:"flex-end"
            }}>
              <Box>
                <IconBtn
                title={"Search"}
                icon={<SearchIcon/>}
                onClick={openSearchDialogBox}
                />
                <IconBtn
                title={"New Group"}
                icon={<AddIcon/>}
                onClick={openNewGroup}
                />
                <IconBtn
                title={"Manage Groups"}
                icon={<GroupIcon/>}
                onClick={navigateToGroup}
                />
                <IconBtn
                title={"Notification"}
                icon={<NotificationsIcon/>}
                onClick={openNotification}
                value={notificationCount}
                />
                <IconBtn
                title={"Logout"}
                icon={<LogoutIcon/>}
                onClick={logoutHandler}
                />          
              </Box>
              
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open={true}/>}>
          <SearchDialog />    
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open={true}/>}>
          <NotificationDialog />    
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true}/>}>
          <NewGroupDialog />    
        </Suspense>
      )}
    </>
  )
}

// <Tooltip title="Manage Groups">
// <IconButton color='inherit' size = "large" onClick={navigateToGroup}>
//   <GroupIcon />
// </IconButton> 
// </Tooltip>    
const IconBtn = ({title,icon,onClick,value}) => {
  return (
    <Tooltip title={title}>
      <IconButton color='inherit' size = "large" onClick={onClick}>
        {value?<Badge badgeContent={value} color="error"> {icon}</Badge>:icon}
      </IconButton> 
    </Tooltip>
  )
}

export default Header