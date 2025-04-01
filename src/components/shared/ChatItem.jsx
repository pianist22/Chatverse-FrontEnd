import React, { memo } from 'react'
import { Link } from '../styles/StyledComponents'
import { Typography,Stack, Box } from '@mui/material'
import AvatarCard from './AvatarCard'
import {motion} from 'framer-motion';

const chatItem = ({
    avatar = [], 
    name,
    _id,
    groupChat = false,
    sameSender,
    isOnline,
    newMessageAlert,
    index = 0,
    handleDeleteChat,
    }) => {
        // console.log(newMessageAlert)
        // console.log(avatar);
  return (
    <Link to={`/chat/${_id}`}
        onContextMenu={(e) => {
            handleDeleteChat(e,_id,groupChat);
        }}
        sx={{
            padding: "0"
        }}
    >
        <motion.div
        initial={{opacity:0,y:"-100%"}}
        whileInView={{opacity:1,y:0}}
        transition={{delay: index * 0.1}}
        style={
            {
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                backgroundColor: sameSender ? "black" : "unset",
                color: sameSender ? "white" : "unset",
                padding: "1rem",
                position: "relative",
            }
        }>
            
            <AvatarCard avatar={avatar} />
            <Stack>
                <Typography>{name}</Typography>
                {
                    newMessageAlert && (
                        <Typography>{newMessageAlert?.count} New Message</Typography>
                    
                    )}
            </Stack>
            {
                isOnline && (
                    <Box 
                    sx={{width: "10px",
                        height: "10px", 
                        borderRadius: "50%", 
                        backgroundColor: "green",
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)"
                    }}/>
                )
            }
        </motion.div>
    </Link>
  )
}

export default memo(chatItem);