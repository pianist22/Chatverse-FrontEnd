import { Add as AddIcon, Delete as DeleteIcon, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoaders } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { Link } from "../components/styles/StyledComponents";
import { bgGradient, matBlack } from "../constants/colors";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { setIsAddMember } from "../redux/reducers/misc";

const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"));

const AddMembersDialog = lazy(() => import("../components/dialogs/AddMembersDialog"));



const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isAddMember} = useSelector(state=>state.misc);

  const myGroups = useMyGroupsQuery("");
  // console.log(myGroups.data);

  const groupDetails = useChatDetailsQuery({chatId,populate:true},
    {skip: !chatId}
  );

  const [updateGroup,isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember,isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);


  const [deleteGroup,isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation); 

  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
  const [isEdit,setIsEdit] = useState(false);
  const [confirmDeleteDialog,setConfirmDeleteDialog] = useState(false);
  const [groupName,setGroupName] = useState("");  
  const [groupNameUpdatedValue,setGroupNameUpdatedValue] = useState("");  

  const [members,setMembers] = useState([]);

  const errors = [{
    isError:myGroups.isError,
    error:myGroups.error,
  },
  {
    isError:groupDetails.isError,
    error:groupDetails.error,
  }
]


  useErrors(errors);

  useEffect(()=>{
    const groupData = groupDetails.data;
    console.log(groupData)
    if(groupData){
      setGroupName(groupData.chat.name);
      setGroupNameUpdatedValue(groupData.chat.name);
      setMembers(groupData.chat.members);
    }
    return ()=>{
      setGroupName("");
      setGroupNameUpdatedValue(""); 
      setMembers([]);
    }
  },[groupDetails.data]);

  const gName = groupDetails.data?.chat?.name; 
  console.log(gName);


  // console.log(chatId);
  const navigateBack = () => {
    navigate("/");
  }
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  }
  const handleMobileClose = ()=>{
    setIsMobileMenuOpen(false);
  }
  const updateGroupName = () => {
    setIsEdit(false);
    updateGroup("Updating Group Name...",{
      chatId,
      name:groupNameUpdatedValue,
    });
    setGroupName(groupNameUpdatedValue);
  };

  const openConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(true);
    console.log("delete Group");
  }

  const closeConfirmDeleteHandler = ()=>{
    setConfirmDeleteDialog(false);
  }

  const openAddMemberHandler = ()=>{
    dispatch(setIsAddMember(true));
    setMembers(groupDetails.data?.chat?.members);
  }

  const deleteHandler = () => {
    deleteGroup("Deleting Group...",chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  }

  const removeMemberHandler = (userId)=>{
    removeMember("Removing Member...",{chatId,userId});
    groupDetails.refetch();
    console.log("refetch");
    setMembers(groupDetails.data?.chat?.members);
  }

  useEffect(()=>{
    if(chatId){
      setGroupName(groupDetails.data?.chat?.name);
      setGroupNameUpdatedValue(groupDetails.data?.chat?.name);
    }

    return ()=>{
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    }
  },[chatId]);
  const IconBtns = (
  <>
    <Box
      sx={{
        display:{
          xs:"block",
          sm:"none",
          position:"fixed",
          right:"1rem",
          top:"1rem",
        }
      }} 
    >
      <IconButton onClick={handleMobile}>
        <MenuIcon/>
      </IconButton>
    </Box>
    <Tooltip title="back"
    >
      <IconButton
        sx={{
          position: "absolute",
          top:"2rem",
          left:"2rem",
          bgcolor:matBlack,
          color:"white",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.7)",
          },
        }}
        onClick={navigateBack}
      >
        <KeyboardBackspaceIcon />
      </IconButton>
    </Tooltip>
  </>
  )

  const GroupName = (
  <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} justifyContent={"center"} padding={"2rem"}>
{
  isEdit?(
  <>
    <TextField value={groupNameUpdatedValue} onChange={(e)=>setGroupNameUpdatedValue(e.target.value)}/>
    <IconButton onClick={updateGroupName} disabled={isLoadingGroupName}><DoneIcon/></IconButton>
  </>
):
  (
  <>
    <Typography variant="h5">{groupName}</Typography>
    <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}><EditIcon/></IconButton>
  </>)
}
  </Stack>
)
const ButtonGroup = (
  <Stack
  direction={{
    sm:"row",
    xs:"column-reverse",
  }}
  spacing={"1rem"}
  p={{
    sm:"1rem",
    xs:"0",
    md:"1rem 4rem",
  }}
  >
    <Button color="error" variant="outlined" startIcon={<DeleteIcon/>} onClick={openConfirmDeleteHandler}>Delete Group</Button>
    <Button variant="contained" startIcon={<AddIcon/>} onClick={openAddMemberHandler}>Add Member</Button>
  </Stack>
)
  return myGroups.isLoading?(<LayoutLoaders/>): (
    <Box
      sx={{
        height: "100vh", // Full screen height
        width: "100vw",  // Full screen width
      }}
    >
      <Grid container sx={{ height: "100%" }}> {/* Ensures the Grid container fills the full height */}
        {/* Left Section */}
        <Grid
          item
          sm={4}
          sx={{
            display: {
              xs: "none", // Hidden on extra small screens
              sm: "flex", // Displayed as flex on small and larger screens
            },
            
            // bgcolor:"bisque",
            height: "100%", // Ensures it occupies the full height of the container
            flexDirection: "column",
            // overflowY: "scroll",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <GroupList myGroups={myGroups?.data?.groups} chatId={chatId}/> 
        </Grid>

        {/* Right Section */}
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center", // Center content vertically
            position: "relative",
            padding: "1rem 3rem",
            bgcolor: "white", // Background color for contrast
            height: "100%", // Ensures it occupies the full height of the container
          }}
        >
          {IconBtns}
          {
            groupName && <>
            {GroupName}

            <Typography variant='body1' margin={"1rem"} alignSelf={"flex-start"}>Members</Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                xs:"0",
                sm:"1rem",
                md:"1rem 4rem",
              }}
              spacing={"2rem"}
              // bgcolor={"bisque"}
              height={"65vh"}
              overflow={"auto"}
            >
              {/* Members */}
              {
                isLoadingRemoveMember? (
                  <CircularProgress/>
                ):
                members.map((i)=>(
                  <UserItem user={i} key={i._id} isAdded styling={{
                    boxShadow: "0px 0px 0.5rem rgba(0,0,0,0.2)",
                    padding:"1rem 2rem",
                    borderRadius:"1rem",
                  }}
                  handler={removeMemberHandler}
                  />
                ))
              }
            </Stack>
            {ButtonGroup}
            </>
          }
        </Grid>
        {
          isAddMember && <Suspense fallback={<Backdrop open/>}>
          <AddMembersDialog chatId={chatId} groupDetails={groupDetails}/>
          </Suspense>
        }  

        {
          confirmDeleteDialog && (
            <Suspense fallback={<Backdrop open/>}>
              <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}/>
            </Suspense>  
          )
        }


        <Drawer sx={{
          display:{
            xs:"block",
            sm:"none"
          }
        }} open={isMobileMenuOpen} onClick={handleMobileClose}>
            <GroupList w={"50vw"} myGroups={myGroups?.data?.groups} chatId={chatId}/>
        </Drawer>
      </Grid>
    </Box>
  );
};

const GroupList = ({w = "100%",myGroups = [],chatId})=>(
  <Stack width={w}
  sx={{
    backgroundImage:bgGradient,
    height:"100%",
    overflow:"auto"
  }}
  >
    {myGroups.length>0?(
      myGroups.map((group)=>{
        return <GroupListItem group={group} chatId={chatId} key={group._id}/>})
    ):(
      <Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>
    )}
  </Stack>
);


const GroupListItem = memo(({group,chatId})=>{
  const {
    name,avatar,_id
  } = group;

  return <Link to={`?group=${_id}`} onClick={(e)=>{
    if (chatId === _id) e.preventDefault();
  }}>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </Link>
});


export default Groups;
