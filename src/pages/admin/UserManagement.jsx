import { Avatar, Skeleton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Tables from '../../components/shared/Tables';
import { transformImage } from '../../lib/features';
import { useAdminUsersQuery } from '../../redux/api/api';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    headerClassName:"table-header",
    width: 200,
  },
  {
    field:"avatar",
    headerName:"Avatar",
    headerClassName:"table-header",
    width: 150,
    renderCell:(params)=> (<Avatar alt={params.row.name} src={params.row.avatar}/>),
  },
  {
    field: 'name',
    headerName: 'Name',
    headerClassName:"table-header",
    width: 200,
  },
  {
    field: 'username',
    headerName: 'Username',
    headerClassName:"table-header",
    width: 200,
  },
  {
    field:"friends",
    headerName:"Friends",
    headerClassName:"table-header",
    width: 150,
  },
  {
    field:"groups",
    headerName:"Groups",
    headerClassName:"table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const {data} = useAdminUsersQuery();
  const [loading,setLoading] = useState(true);
  // console.log(data);
  // const users = data?.users;
  // console.log(users);
  const [rows,setRows] = useState([]);
  useEffect(()=>{
    if(data){
      setLoading(false);
      setRows(data?.users.map((i)=>({...i,id:i._id,avatar:transformImage(i.avatar,50),})));
    }
  },[data])
  return (
    <AdminLayout>
      {
        loading?<Skeleton/>:
        <Tables heading={"All Users"} columns={columns} rows={rows}/>
      }
    </AdminLayout>
  )
}

export default UserManagement