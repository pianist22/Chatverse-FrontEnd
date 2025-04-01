


import React from 'react'
import './loader.css'
import { Grid } from '@mui/system'
import { Skeleton } from '@mui/material'
import {Stack} from '@mui/system'
import { BouncingSkeleton } from '../styles/StyledComponents'


const LayoutLoaders = () => {
  return (
    <Grid
    sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      // marginTop: "4rem", // Adjust margin for a header, if any
    }}
    spacing={"1rem"}
  >
    {/* Left Section */}
    <Grid
      sx={{
        backgroundColor: "#f5f5f5",
        height: "calc(100vh - 4rem)", // Full height minus header
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
      <Skeleton variant='rectangular' />
    </Grid>

    {/* Center Section */}
    <Grid
      sx={{
        backgroundColor: "#e0e0e0",
        height: "calc(100vh - 4rem)", // Full height minus header
        
        width: {
          xs: "100%", // Full width on extra-small screens
          sm: "75%", // 2/3 width on small screens
          md: "50%", // Half width on medium screens
          lg: "50%", // 2/3 width on large screens
        },
      }}
    >
      <Stack spacing={"1rem"}>
      {
        Array.from({length: 10}).map((_, index) => (
            <Skeleton key={index} variant='rounded' height={"4rem"}/>
          ))
        }
      </Stack>
    </Grid>

    {/* Right Section */}
    <Grid
      sx={{
        backgroundColor: "#cfcfcf",
        height: "calc(100vh - 4rem)", // Full height minus header
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
      <Skeleton variant='rectangular' />
  </Grid>

  </Grid>

  )
};

const TypingLoader = ()=>{
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton variant='circular' height={15} width={15} style={{
        animationDelay:"0.1s"
      }}/>
      <BouncingSkeleton variant='circular' height={15} width={15} style={{
        animationDelay:"0.2s"
      }}/>
        <BouncingSkeleton variant='circular' height={15} width={15} style={{
        animationDelay:"0.4s"
      }}/>
      <BouncingSkeleton variant='circular' height={15} width={15} style={{
        animationDelay:"0.6s"
      }}/>
    </Stack>
  )
};

export {LayoutLoaders,TypingLoader};

