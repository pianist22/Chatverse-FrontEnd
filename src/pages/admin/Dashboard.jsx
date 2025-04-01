import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon} from '@mui/icons-material'
import moment from 'moment'
import { CurveButton, SearchField } from '../../components/styles/StyledComponents'
import { DoughnutChart, LineChart } from '../../specific/Charts';
import { useFetchData } from "6pp";
import { server } from '../../constants/config';
import { useAdminStatsQuery } from '../../redux/api/api'
// import {LayoutLoaders} from '../../components/layout/Loaders';
// import { useDispatch } from 'react-redux'
// import { adminStats } from '../../redux/reducers/thunks/admin'
// import axios from 'axios'

const Dashboard = () => {
  const {data} = useAdminStatsQuery();

  const stats = data?.messages || {};

  const Appbar = (
    <Paper
    elevation={3}
    sx={{
      padding:"2rem", margin:"2rem 0", borderRadius:"1rem",
    }}
    >
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AdminPanelSettingsIcon sx={{
        fontSize:"3rem"
      }}/>
      <SearchField placeholder='Search...'/>
      <CurveButton>Search</CurveButton>
      <Box sx={{flexGrow:1}}/>
      <Typography
        display={{
          xs:"none",
          lg:"block",
        }}
        color={"rgba(0,0,0,0.7)"}
        textAlign={"center"}
      >{moment().format("dddd, D MMMM YYYY ")}</Typography>
      <NotificationsIcon/>
    </Stack>
    </Paper>
  );
  const Widgets = (
    <Stack
    direction={{
      xs:"column",
      sm:"row"
    }}
    spacing="2rem"
    justifyContent="space-between"
    alignItems={"center"}
    margin={"2rem 0"}
    >
      <Widget title={"Users"} value={stats?.usersCount} Icon={<PersonIcon/>}/>
      <Widget title={"Chats"} value={stats?.totalChatsCount} Icon={<GroupIcon/>}/>
      <Widget title={"Messages"} value={stats?.messagesCount} Icon={<MessageIcon/>}/>
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
      {Appbar}
      <Stack direction={{
        xs:"column",
        lg:"row"
      }} sx={{gap:"2rem"}} flexWrap={"wrap"} justifyContent={"center"}
      alignItems={{
        xs:"center",
        lg:"stretch"
      }}
      >
        <Paper 
        elevation={5}
        sx={{
          padding:"2rem 3.5rem",
          borderRadius:"1rem",
          width:"100%",
          maxWidth:"45rem",
        }}
        >
          <Typography margin={"2rem 0"} variant='h4'>Last Messages</Typography>
          <LineChart value={stats?.messagesChart}/>
        </Paper>
        <Paper 
        elevation={3}
        sx={{
          padding:"1rem",
          borderRadius:"1rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width:{xs:"100%",sm:"50%"},
          position:"relative",
          maxWidth:"25rem",
        }}
        ><DoughnutChart labels={["Single Chats","Group Chats"]} value={[stats?.totalChatsCount-stats?.groupsCount || 0,stats?.groupsCount || 0]}/>
        <Stack
        position={"absolute"}
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={"0.5rem"}
        width={"100%"}
        height={"100%"}
        > 
        <GroupIcon/> <Typography>Vs</Typography> <PersonIcon/>
        </Stack>
        </Paper>
      </Stack>
      {
        Widgets
      }
      </Container>
    </AdminLayout>
  )
}

const Widget = ({title,value,Icon})=> (
  <Paper
  sx={{
    padding:"2rem",
    borderRadius:"1.5rem",
    margin:"2rem 0",
    width:"20rem"
  }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color:"rgba(0,0,0,0.7)",
          borderRadius:"50%",
          border:"5px solid rgba(0,0,0,0.9)",
          width:"5rem",
          height:"5rem",
          display:"flex",
          justifyContent:"center",
          alignItems:"center"
        }}
      >{value}</Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
</Paper>);

export default Dashboard