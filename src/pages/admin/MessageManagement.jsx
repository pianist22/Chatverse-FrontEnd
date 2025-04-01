import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Avatar, Box, Skeleton, Stack, Table } from '@mui/material';
import Tables from '../../components/shared/Tables';
import { dashboardData } from '../../constants/sampleData';
import { fileFormat, transformImage } from '../../lib/features';
import moment from 'moment';
import RenderAttachment from '../../components/shared/RenderAttachment';
import { useAdminMessagesQuery } from '../../redux/api/api';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName:"table-header",
    width: 200,
  },
  {
    field:"attachments",
    headerName:"Attachments",
    headerClassName:"table-header",
    width: 200,
    renderCell:(params)=> {
      const {attachments} = params.row;
      return attachments?.length >0? attachments.map((i)=>{
        const url = i.url;
        const file = fileFormat(url);

        return <Box>
          <a
            href={url}
            target='_blank'
            download
            style={{
              color:"black"
            }}
          >
            {RenderAttachment(file,url)}
          </a>
        </Box>
      }):"No Attachments";
    },
  },
  {
    field: 'content',
    headerName: 'Content',
    headerClassName:"table-header",
    width: 400,
  },
  {
    field:"sender",
    headerName:"Send By",
    headerClassName:"table-header",
    width: 250,
    renderCell: (params)=>(
      <Stack direction="row" alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field:"chat",
    headerName:"Chat",
    headerClassName:"table-header",
    width: 220,
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
    headerClassName:"table-header",
    width: 100,
  },
  {
    field:"createdAt",
    headerName:"Time",
    headerClassName:"table-header",
    width: 250,
  },
];

const MessageManagement = () => {
  const {data} = useAdminMessagesQuery();
  // console.log(data);
  const [loading,setLoading] = useState(true);
  const [rows,setRows] = useState([]);
  console.log(dashboardData.messages);

  useEffect(()=>{
    if(data){
      setLoading(false);
      setRows(data.messages.map((i)=>({
        ...i,
        id:i._id,     
        sender:{
                name:i.sender.name,
                avatar:transformImage(i.sender.avatar,50),
              },
        createdAt:moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      })));
    }
  },[data]);

  return (
    <AdminLayout>
      {
        loading?<Skeleton/>:
        <Tables heading={"All Messages"} columns={columns} rows={rows} rowHeight={200}/>
      }
    </AdminLayout>
  )
}

export default MessageManagement