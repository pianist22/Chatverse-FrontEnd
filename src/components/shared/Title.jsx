

import { Grid, Grid2 } from '@mui/material'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Title = ({title = "ChatVerse",
    description = "This is the chat app called Chatverse."
}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default Title