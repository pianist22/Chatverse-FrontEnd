
import { useInputValidation } from '6pp'
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserItem from '../components/shared/UserItem'
import { sampleUsers } from '../constants/sampleData'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { setIsNewGroup } from '../redux/reducers/misc'
import toast from 'react-hot-toast'

const NewGroup = () => {
  const {isNewGroup} = useSelector(state=>state.misc);
  const dispatch = useDispatch();

  const {isError,isLoading,error,data} = useAvailableFriendsQuery("");
  console.log(data);

  const [newGroup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  const groupName = useInputValidation("");
  const [members,setMembers] = useState(sampleUsers);
  const [selectedMembers,setSelectedMembers] = useState([]);

  const errors = [{
    isError,
    error,
  }]

  useErrors(errors);

  const selectMemberHandler = (id) => {
    setMembers(prev=>prev.map(user=>user._id===id?{...user,idAdded:!user.isAdded}:user));
    setSelectedMembers((prev) =>(prev.includes(id))?prev.filter((curr)=>curr!==id):[...prev,id]);
  }
  // console.log(selectedMembers);
  const submitHandler = () => {
    if(!groupName.value) return toast.error("Group Name is required");
    if(selectedMembers.length < 2){
      return toast.error("Please select Atleast 3 Members");
    }
    console.log(groupName.value,selectedMembers);
    // creating a group 
    newGroup("Creating New Group...",{
      name:groupName.value,
      members:selectedMembers,
    });
    closeHandler();
  }
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  }
  return (
    <Dialog onClose={closeHandler} open={isNewGroup}>
      <Stack p={{xs:"1rem",sm:"2rem"}} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>
        <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler}/>
        <Typography variant='body1'>Members</Typography>
        <Stack>
            {
              isLoading?(
                <Skeleton/>
              ):
              (
              data?.friends?.map((i) => (
              <UserItem 
                user={i}
                key={i._id}
                handler={selectMemberHandler} 
                isAdded={selectedMembers.includes(i._id)}
                />
              )))
            }
          </Stack>
          <Stack directions={"column"} justifyContent={"space-evenly"}>
            <Button variant='text' color='error' size='large' onClick={closeHandler}>Cancel</Button>
            <Button variant='contained' size='large' onClick={submitHandler} disabled={isLoadingNewGroup}>Create</Button>
          </Stack>
      </Stack>
    </Dialog>
  )
}

export default NewGroup