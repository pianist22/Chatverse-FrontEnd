
import React, { memo } from 'react'

import { Avatar, Button, Dialog, DialogTitle, ListItem, Skeleton, Stack, Typography } from '@mui/material'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useErrors } from '../hooks/hook'
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from '../redux/api/api'
import { setIsNotification } from '../redux/reducers/misc'

const Notifications = () => {
  const {isNotification} = useSelector((state) => state.misc);
  const {isLoading,data,error,isError} = useGetNotificationsQuery();

  const dispatch = useDispatch();

  const [acceptRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async({_id,accept}) => {
    // add friend request handler 
    dispatch(setIsNotification(false));
    try{
      const res = await acceptRequest({requestId:_id,accept});
      if(res.data?.success){
        console.log("Use Socket Here");
        toast.success(res.data.message);
      }
      else{
        toast.error(res.data?.error || "Something went Wrong!!");
      }
    }
    catch(error){
      toast.error("Something went wrong!!");
      console.log(error);
    }
  }
  // console.log(data);

  const closeHandler = ()=> dispatch(setIsNotification(false));

  useErrors([{error,isError}]);

  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{xs:"1rem",sm:"2rem"}} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>
        {
          isLoading?<Skeleton/>:
          <>
            {
            data?.allRequest.length > 0 ?(
              data?.allRequest?.map(({sender,_id})=>
              <NotificationsItem sender ={sender} _id={_id} handler={friendRequestHandler} key={_id}/>)
            ) :
              (<Typography textAlign={"center"}>0 notifications</Typography>)
          }        
          </>
        }
      </Stack>
    </Dialog>
  )
}

const NotificationsItem = memo(({sender,_id,handler})=>{
  const {name,avatar} = sender;
  return (
    <ListItem>
        <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        >
            <Avatar/>
            <Typography
            variant='body1'
            sx={{
                flexGrow:1,
                overflow:"hidden",
                textOverflow:"ellipsis",
                display:"-webkit-box",
                WebkitBoxOrient:"vertical",
                WebkitLineClamp:1,
                width:"100%"
            }}
            >
              {`${name} sent you a friend request`}
            </Typography>

            <Stack 
               direction={{
                xs:"column",
                sm:"row"
               }}
            >
              <Button onClick={()=> handler({_id,accept:true})}>Accept</Button>
              <Button color='error' onClick={()=> handler({_id,accept:false})}>Reject</Button>
            </Stack>
        </Stack>
    </ListItem>
  )
})

export default Notifications