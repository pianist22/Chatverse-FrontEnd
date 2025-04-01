
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { server } from '../../constants/config';

const api = createApi({
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat","User","Message"],

    endpoints:(builder)=>({
        mychats: builder.query({
            query:()=>({
                url: "chat/my",
                credentials:"include",
            }),
            providesTags:["Chat"],
        }),
        searchUser: builder.query({
            query: (name)=>({
                url: `user/searchUser?name=${name}`,
                credentials:"include",
            }),
            providedTags:["User"],
        }),
        sendFriendRequest: builder.mutation({
            query:(data)=>({
                url:"user/sendrequest",
                method:"PUT",
                credentials:"include",
                body:data,
            }),
            invalidatesTags:["User"],
        }),
        getNotifications: builder.query({
            query: (name)=>({
                url: `user/notifications`,
                credentials:"include",
            }),
            keepUnusedDataFor: 0,
        }), 
        acceptFriendRequest: builder.mutation({
            query:(data)=>({
                url:"user/acceptRequest",
                method:"PUT",
                credentials:"include",
                body:data,
            }),
            invalidatesTags:["Chat"],
        }),       
        chatDetails: builder.query({
            query: ({chatId,populate = false})=>{
                let url = `chat/${chatId}`

                if(populate) url += `?populate=true`;

                return {
                    url:url,
                    credentials:"include",
                }
            }
            ,
            providedTags:["Chat"],
        }),
        getMessages: builder.query({
            query: ({chatId,page})=>({
                url:`chat/message/${chatId}?page=${page}`,
                credentials:"include",
            }) 
            ,
            keepUnusedDataFor: 0,
        }),
        sendAttachments: builder.mutation({
            query:(data)=>({
                url:"chat/message",
                method:"POST",
                credentials:"include",
                body:data,
            }),
        }),
        myGroups: builder.query({
            query:()=>({
                url: "chat/my/groups",
                credentials:"include",
            }),
            providesTags:["Chat"],
        }),
        availableFriends: builder.query({
            query: (chatId)=>{
                let url = `user/friends`;

                if(chatId) url += `?chatId=${chatId}`;

                return {
                    url:url,
                    credentials:"include",
                }
            }
            ,
            providedTags:["Chat"],
        }),
        newGroup: builder.mutation({
            query:({name,members})=>({
                url:"chat/new",
                method:"POST",
                credentials:"include",
                body:{name,members},
            }),
            invalidatesTags:["Chat"],
        }),
        renameGroup: builder.mutation({
            query:({chatId,name})=>({
                url:`chat/${chatId}`,
                method:"PUT",
                credentials:"include",
                body:{name},
            }),
            invalidatesTags:["Chat"],
        }),
        removeGroupMember: builder.mutation({
            query:({chatId,userId})=>({
                url:`chat/remove-member`,
                method:"PUT",
                credentials:"include",
                body:{chatId,userId},
            }),
            invalidatesTags:["Chat"],
        }),
        addGroupMembers: builder.mutation({
            query:({members,chatId})=>({
                url:`chat/add-members`,
                method:"PUT",
                credentials:"include",
                body:{members,chatId},
            }),
            invalidatesTags:["Chat"],
        }),
        deleteChat: builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"],
        }),
        leaveGroup: builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"],
        }),
        adminStats: builder.query({
            query:()=>({
                url: "admin/stats",
                credentials:"include",
            }),
        }),
        adminUsers: builder.query({
            query:()=>({
                url: "admin/users",
                credentials:"include",
            }),
        }),
        adminChats: builder.query({
            query:()=>({
                url: "admin/chats",
                credentials:"include",
            }),
        }),
        adminMessages: builder.query({
            query:()=>({
                url: "admin/messages",
                credentials:"include",
            }),
        }),

    }),
});

export default api;
export const {useMychatsQuery,useLazySearchUserQuery,useSendFriendRequestMutation,useGetNotificationsQuery,useAcceptFriendRequestMutation,useChatDetailsQuery,useGetMessagesQuery,useSendAttachmentsMutation,useMyGroupsQuery,useAvailableFriendsQuery,useNewGroupMutation,useRenameGroupMutation,useRemoveGroupMemberMutation,useAddGroupMembersMutation,useDeleteChatMutation,useLeaveGroupMutation,useAdminStatsQuery,useAdminUsersQuery,useAdminChatsQuery,useAdminMessagesQuery} = api;
