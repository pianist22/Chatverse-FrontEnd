import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sampleUsers } from '../../constants/sampleData'
import UserItem from '../shared/UserItem'
import { useAsyncMutation, useErrors } from '../../hooks/hook'
import { useAddGroupMembersMutation, useAvailableFriendsQuery, useChatDetailsQuery } from '../../redux/api/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/reducers/misc'

const AddMembersDialog = ({chatId,groupDetails}) => {
    const dispatch = useDispatch();
    const {isAddMember} = useSelector((state)=>state.misc);

    const [members,setMembers] = useState(groupDetails?.data?.chat?.members);

    const {isLoading,data,isError,error} = useAvailableFriendsQuery(chatId);

    // const [members,setMembers] = useState(sampleUsers);
    const [selectedMembers,setSelectedMembers] = useState([]);

    const [addMembers,isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);
    
    const selectMemberHandler = (id) => {
        setSelectedMembers((prev) =>(prev.includes(id))?prev.filter((curr)=>curr!==id):[...prev,id]);
    }

    const closeHandler = ()=>{
        dispatch(setIsAddMember(false));
    }
    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...",{chatId,members:selectedMembers});
        closeHandler();
        setMembers((prev) => [...prev,...selectedMembers]);
        groupDetails.refetch();
    }

    console.log(data);

    useErrors([{isError,error}]);
    return (
    <Dialog open={isAddMember} onClose={closeHandler}>
        <Stack p={"1rem"} width={"18rem"} spacing={"1rem"}>
            <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
            <Stack>
                {isLoading?(<Skeleton/>): (data?.friends?.length > 0?
                    (data?.friends?.map(i=>(
                        <UserItem key={i._id} user={i} handler={selectMemberHandler} isAdded={selectedMembers.includes(i._id)}/>
                    ))):(
                        <Typography textAlign={"center"}>No Friends</Typography>
                    ))
                }
            </Stack>
            <Stack
            direction={"row"}
            justifyContent={"space-evenly"}
            alignItems={"center"} 
            >
                <Button color='error' onClick={closeHandler}>Cancel</Button>
                <Button onClick={addMemberSubmitHandler} variant='contained' disabled={isLoadingAddMembers}>Submit Changes</Button>
            </Stack>
        </Stack>
    </Dialog>
  )
}

export default AddMembersDialog