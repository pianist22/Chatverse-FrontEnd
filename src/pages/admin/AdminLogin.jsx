import { useInputValidation } from '6pp'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, Container, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, getAdmin } from '../../redux/reducers/thunks/admin';



const AdminLogin = () => {
    const {isAdmin} = useSelector(state=>state.auth);
    const dispatch = useDispatch();

    const secretKey = useInputValidation("");
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value));
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
      event.preventDefault();
    };

    useEffect(()=>{
      dispatch(getAdmin());
    },[dispatch]);

    if (isAdmin) return <Navigate to="/admin/dashboard"/>

  return (
    <div
    style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,1) 4%, rgba(8,5,219,1) 93%)',
      maxHeight: '100%', 
    }}
    >
      <Container component={"main"}
      maxWidth="xs"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
      >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
        }}
        > 
      { 
        <>
          <Typography variant='h5' >Admin Login</Typography>
          <form style={{
            width: '100%',
            marginTop: '1rem',
          }}
          onSubmit={submitHandler}
          >
            <TextField 
              required
              fullWidth
              label = 'Secret Key'
              margin = 'normal'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              value={secretKey.value}
              onChange={secretKey.changeHandler}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                      >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              />
        {/* {
              password.error && 
              <Typography variant='caption' color='error' >{password.error}</Typography>
              } */}
            <Button
              type='submit'
              variant='contained'
              
              color='primary'
              fullWidth
              sx={{marginTop: '1rem',
                marginBottom: '1rem'
              }}
              >
                Login
            </Button>
          </form>
        </>
      }
      </Paper>
      </Container>

    </div>
  )
}

export default AdminLogin