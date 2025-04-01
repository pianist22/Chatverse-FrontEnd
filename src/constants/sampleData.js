// avatar = [], 
// name,
// _id,
// groupChat = false,
// sameSender,
// isOnline,
// newMessageAlert,
// index = 0,


// handleDeleteChatOpen,
export const sampleChats = [
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Doe",
        _id:"1",
        groupChat:false,
        members:["1","2"],
    },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Boe",
        _id:"2",
        groupChat:true,
        members:["1","2"],
    },
];

export const sampleUsers = [
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Doe",
        _id:"1",
    },
    {
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        name:"John Boe",
        _id:"2",
    },   
];

export const sampleNotifications = [
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"John Doe",
        },
        _id:"1",
    },
    {
        sender:{
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            name:"John Boe",
        },
        _id:"2",
    },    
];

export const sampleMessage = [
    {
        content:"Priyanshu ka message aaya hain",
        _id: "adlkfjdjfalkdjfkla",
        sender:{
            _id:"user._id",
            name:"Priyanshu",
        },
        chat: "chatId",
        createdAt: "2025-01-01T10:41:30.630Z",
    },
    {
        attachments:[
            {
                public_id:"asdsad2",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            },
        ],
        content:"",
        _id: "adlkfjdjfalasdkdjfkla",
        sender:{
            _id:"sdfsdfsdf",
            name:"Priyanshu 2",
        }, 
        chat: "chatId",
        createdAt: "2025-01-01T10:41:30.630Z",
    },   
];

export const dashboardData = {
    users:[
        {
            name:"John Doe",
            _id:"1",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            username:"john_doe",
            friends:20,
            groups:5,
        },
        {
            name:"John Boe",
            _id:"2",
            avatar:["https://www.w3schools.com/howto/img_avatar.png"],
            username:"john_boe",
            friends:25,
            groups:8,
        },
    ],
    chats:[
        {
        name:"Bindass Group",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        _id:"1",
        groupChat:false,
        members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
        ],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"John Doe",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
        }
    },
    {
        name:"Andaaz Group",
        avatar:["https://www.w3schools.com/howto/img_avatar.png"],
        _id:"2",
        groupChat:false,
        members:[{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
            {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
        ],
        totalMembers:2,
        totalMessages:20,
        creator:{
            name:"John Boi",
            avatar:"https://www.w3schools.com/howto/img_avatar.png",
        },
    },
    ],
    messages:[
        {
            attachments:[],
            content:"Priyanshu ka message aaya hain",
            _id:"jdfkljad;fjadklf",
            sender:{
                name:"Priyanshu",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            },
            chat: "chatId",
            groupChat:false,
            createdAt: "2025-01-01T10:41:30.630Z",
        },
        {
            attachments:[
                {
                    public_id:"asdsad2",
                    url:"https://www.w3schools.com/howto/img_avatar.png",
                },
            ],
            content:"Robin ka message aaya hain",
            _id:"jdfkljadffjadklf",
            sender:{
                name:"Robin",
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
            },
            chat: "chatId",
            groupChat:true,
            createdAt: "2025-01-01T10:41:30.630Z",
        },
    ],
};