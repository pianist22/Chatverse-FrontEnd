import { Close as CloseIcon, Dashboard as DashboardIcon, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, Message as MessageIcon } from '@mui/icons-material'
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'
import { greyColor, matBlack } from '../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import { adminLogout } from '../../redux/reducers/thunks/admin'

const StyledLink = styled(LinkComponent)`
    text-decoration: none;
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    transition: color 0.3s ease;

    &:hover {
        color: rgba(0, 0, 0, 0.54);
    }
`;

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        icon: <DashboardIcon/>,
    }, 
    {
        name: "Users",
        path: "/admin/users",
        icon: <ManageAccountsIcon/>,
    }, 
    {
        name: "Chats",
        path: "/admin/chats",
        icon: <GroupsIcon/>,
    }, 
    {
        name: "Messages",
        path: "/admin/messages",
        icon: <MessageIcon/>,
    }, 
]

const Sidebar = ({w = "100%"}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(adminLogout());
    }
    return (
        <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
            <Typography variant='h5'>Admin Panel</Typography>
            <Stack spacing={"1rem"}>
                {
                    adminTabs.map((tab)=>(
                        <StyledLink key={tab.path} to={tab.path}
                        sx={
                            location.pathname === tab.path && {
                                bgcolor:matBlack,
                                color:"white",
                                ":hover":{
                                    color:"white",
                                }
                            }
                        }
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                {tab.icon}
                                <Typography>{tab.name}</Typography>
                            </Stack>
                        </StyledLink>
                    ))
                }
                <StyledLink onClick={logoutHandler}
                        >
                            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                                <ExitToAppIcon/>
                                <Typography>Logout</Typography>
                            </Stack>
                    </StyledLink>
            </Stack>
        </Stack>
    )
}

// const isAdmin = true;

const AdminLayout = ({children}) => {
    const {isAdmin} = useSelector(state=>state.auth);

    const [isMobile,setIsMobile] = useState(false);

    const handleMobile = () => setIsMobile(!isMobile);
    const handleClose = () => setIsMobile(false);
    if(!isAdmin) return <Navigate to="/admin"/>
  return (
    <Grid container minHeight={"100vh"}>
        <Box
            sx={{
                display:{xs:"block",md:"none"},
                position:"fixed",
                right:"1rem",
                top:"1rem",
            }}
        >   
            <IconButton onClick={handleMobile}>
                {
                    isMobile?
                    <CloseIcon/>:<MenuIcon/>
                }
            </IconButton>
        
        </Box>
        <Grid
           item
           md={4}
           lg={3}
           sx={{display:{xs:"none",md:"block"}}}
        >
            <Sidebar/>
        </Grid>
        <Grid
            item
            xs={12}
            md={8}
            lg={9}
            sx={{
                bgcolor:greyColor,
            }}
        >
            {children}
        </Grid>
        <Drawer open={isMobile} onClose={handleClose}>
            <Sidebar w="45vw"/>
        </Drawer>
    </Grid>
  )
}

export default AdminLayout