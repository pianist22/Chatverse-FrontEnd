

import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { CameraAlt, Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Button, Container, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { VisuallyHiddenInput } from '../components/styles/StyledComponents';
import { userNameValidator } from '../utils/validators';
import toast, {Toaster} from 'react-hot-toast'
import { userExists } from '../redux/reducers/auth';
import axios from 'axios';
import { server } from '../constants/config';

// background: rgb(255,255,255);
// background: linear-gradient(90deg, rgba(255,255,255,1) 4%, rgba(8,5,219,1) 93%);

// background: rgb(108,16,161);
// background: linear-gradient(90deg, rgba(108,16,161,1) 11%, rgba(255,107,252,0.9866071428571429) 91%);

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(true); // this state variable is used as if it is true then we will represent the Login page otherwise Register Page  
  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  const [isLoading,setIsLoading] = useState(false);

  const name = useInputValidation('');
  const bio = useInputValidation('');
  const username = useInputValidation('',userNameValidator);
  const password = useStrongPassword('');
  const avatar = useFileHandler('single');


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();

  const handleLogin = async(e)=>{
    e.preventDefault();
    setIsLoading(true);
    const toastId = toast.loading("Logging In...");

    const config = {
      withCredentials:true,
      headers:{
        "Content-Type":"application/json"
      }
    };
    try{
      const {data} = await axios.post(`${server}/api/v1/user/login`,{
        username:username.value,
        password:password.value,
      },config);
      dispatch(userExists(data.user));
      toast.success(data.message,{
        id:toastId,
      });
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Something went Wrong!!",{
        id:toastId,
      });
    }
    finally{
      setIsLoading(false);
    }

  }

  const handleSignup = async(e)=>{
    e.preventDefault();
    // console.log("Sign UP");
    setIsLoading(true);

    const toastId = toast.loading("Signing Up...");
    
    const formData = new FormData();
    formData.append("avatar",avatar.file);
    formData.append('name',name.value);
    formData.append('username',username.value);
    formData.append('password',password.value);
    formData.append('bio',bio.value);

    console.log(formData);

    const config  = {
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    };

    try{
      const {data} = await axios.post(`${server}/api/v1/user/new`,formData,config);
      dispatch(userExists(data.user));
      toast.success(data.message,{
        id:toastId,
      });
    }
    catch(error){
      toast.error(error?.response?.data?.message || "Something went Wrong!!",{
        id:toastId,
      });
    }
    finally{
      setIsLoading(false);
    }

  }


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
        isLoggedIn ? 
        <>
          <Typography variant='h5' >Login</Typography>
          <form style={{
            width: '100%',
            marginTop: '1rem',
          }}
          onSubmit={handleLogin}
          >
            <TextField 
              required
              fullWidth
              label = 'Username'
              margin = 'normal'
              variant='outlined'
              value={username.value}
              onChange={username.changeHandler}
              />
            {
              username.error && 
              <Typography variant='caption' color='error' >{username.error}</Typography>
            }
            <TextField 
              required
              fullWidth
              label = 'Password'
              margin = 'normal'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              value={password.value}
              onChange={password.changeHandler}
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
              disabled={isLoading}
              >
                Login
            </Button>
            <Typography textAlign={'center'} >Or</Typography>
            <Button
              disabled={isLoading}
              type='submit'
              variant='text'
              fullWidth
              sx={{marginTop: '1rem',
                textUnderlineOffset: '2px',
              }}
              onClick={toggleLogin}
              >
                Sign Up Here 
            </Button>
          </form>
        </>
        : 
        <>
        <Typography variant='h5' >Sign Up</Typography>
        <form style={{
          width: '100%',
          marginTop: '1rem',
        }}
        onSubmit={handleSignup}
        >
          <Stack position={'relative'} width={'10rem'} margin={'auto'}>
            <Avatar
              sx={{
                width: '10rem',
                height: '10rem',
                objectFit: 'contain',
              }}
              src={avatar.preview}
              />
            <IconButton sx={
              {
                position: 'absolute',
                bottom: 0,
                right: 0,
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.6)',
                ":hover":{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              }}
              component='label'
              >
              <>
                <CameraAlt></CameraAlt>
                <VisuallyHiddenInput type='file' onChange={avatar.changeHandler}/>
              </>
            </IconButton>
          </Stack>
          {
            avatar.error && 
            <Typography variant='caption' color='error' >{avatar.error}</Typography>
          }
          <TextField 
            required
            fullWidth
            label = 'Name'
            margin = 'normal'
            variant='outlined'
            value={name.value}
            onChange={name.changeHandler}
            />
          <TextField 
            required
            fullWidth
            label = 'Username'
            margin = 'normal'
            variant='outlined'
            value={username.value}
            onChange={username.changeHandler}
            />
            {
              username.error && 
              <Typography variant='caption' color='error' >{username.error}</Typography>
            }
            <TextField 
              required
              fullWidth
              label = 'Password'
              margin = 'normal'
              variant='outlined'
              type={showPassword ? 'text' : 'password'}
              value={password.value}
              onChange={password.changeHandler}
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
          <TextField 
            fullWidth
            required
            label = 'Bio'
            margin = 'normal'
            variant='outlined'
            value={bio.value}
            onChange={bio.changeHandler}
            />          
          <Button
            disabled={isLoading}
            type='submit'
            variant='contained'
            
            color='primary'
            fullWidth
            sx={{marginTop: '1rem',
              marginBottom: '1rem'
            }}
            >
              Sign Up
          </Button>
          <Typography textAlign={'center'}>Or</Typography>
          <Button
            disabled={isLoading}
            type='submit'
            variant='text'
            fullWidth
            sx={{marginTop: '1rem',
              textUnderlineOffset: '2px',
            }}
            onClick={toggleLogin}
            >
              Login Here 
          </Button>
        </form>
      </>
      }
      </Paper>
      </Container>

    </div>
  )
}

export default Login