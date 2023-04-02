 //Entry Point to Server

const express = require("express");

//instance of express func
const app = express();

// We need this to build our server with socket.io
// Socket.io Created upon http server 
const http = require("http");

// class Server from socket.io library
const { Server } = require("socket.io");

// Socket io deals with lot of cors issues
const cors = require("cors");

// app uses cors middleware
app.use(cors());

// http creates server for us
const server = http.createServer(app);
let onlineUsers=[];
// let reconnectRoom=0;
// const PORT =3001 || process.env.PORT;

const io = new Server(server, {
    cors: {
      //telling our server which url is making calls to our socket io server
      // react server
      origin: "http://192.168.1.149:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection",(socket)=>{

  console.log(`User Connected  ${socket.id}`);

  socket.on("send_message",(data)=>{
  socket.to(data.room).emit("receive_message",data);
  })

  socket.on("send_message_Lane",(data)=>{
  socket.to(data.lane).emit("receive_message_Lane",data);
  })

  socket.on("join_room",(data)=>{
    
    console.log("index.js join_room");
    // socket.join();
    // socket.join([data.room],[data.lane]);
    socket.join(data.room);
    socket.join(data.lane);
    // console.log(data.room);
    socket.userID=data.userSocketID;
    console.log("userID "+socket.userID);
    console.log(socket);
    console.log(socket.rooms);
    console.log(data);
    // console.log(Object.values(socket.rooms));
    // console.log(io.sockets.adapter.sids[socket.id]);
    // if(io.sockets.adapter.rooms.has(data.room))
    // roomLength=io.sockets.adapter.rooms.get(data.room).size;
    // console.log("room/roomLength "+data.room+"/"+roomLength);
    // else
    // length=1;
    // onlineUsers[socket.id]=[];
    // onlineUsers[socket.id].push(data.username);
    // onlineUsers[socket.id].push(data.room);
    //socket[data.username] = data.username;

    console.log(`✋ ${data.username} has joined the chat! ✋`);
    console.log("lane "+data.lane+","+data.lrdata.lane);
    socket.to(data.lane).emit("showsomeonejoinedLane",data);
    console.log("room "+data.room+","+data.lrdata.room);
    socket.to(data.room).emit("showsomeonejoinedRoom",data);

    // var roomLength=io.sockets.adapter.rooms.get(data.room).size;
    // console.log("roomLength "+roomLength);
    // io.in(data.room).emit("room-user-count",data);

    // var laneLength=io.sockets.adapter.rooms.get(data.lane).size;
    // console.log("laneLength "+laneLength);
    // io.in(data.lane).emit("lane-user-count",laneLength);
      
  });

  socket.on("user-left",(data)=>{
    // socket[data.username] = data.username;
    console.log("index.js user-left");
    console.log(data);
    console.log("Before userID "+socket.userID);
    console.log("room "+data.room+","+data.lrdata.room);
    console.log("lane "+data.lane+","+data.lrdata.lane);

    socket.leave(data.room);
    socket.leave(data.lane);
    console.log("After userID "+socket.userID);
    // console.log(showChat);
    // socket.disconnect();

    var roomLength=0;

    // if(io.sockets.adapter.rooms.has(data.room))
    // roomLength=io.sockets.adapter.rooms.get(data.room).size;

    console.log(`✋ ${data.username} has left the chat! ✋`);

    // console.log("roomLength "+roomLength);
    // reconnectRoom=data.room;
    if(io.sockets.adapter.rooms.has(data.room))
    socket.to(data.room).emit("showsomeoneleftRoom",data);

    if(io.sockets.adapter.rooms.has(data.lane))
    socket.to(data.lane).emit("showsomeoneleftLane",data);
    // console.log("user-left");
    // console.log(`✋ ${username} has left the chat! ✋`);
    // socket.to(room).emit("showsomeoneleft",username);
  });

    // socket.on("connect_error", () => {
    //   setTimeout(() => {
    //     socket.connect();
    //   }, 1000);
    // });
    
    // socket.on('disconnect', ()=>{
      
    //   console.log(onlineUsers[socket.id]);
      
    //   if(onlineUsers[socket.id]===undefined)
    //   console.log(`User Disconnected ${socket.id}`);
    //   else
    //   {
    //   console.log("disconnect");

    //   var length;
    //   if(io.sockets.adapter.rooms.has(onlineUsers[socket.id][1]))
    //   length=io.sockets.adapter.rooms.get(onlineUsers[socket.id][1]).size;
    //   else
    //   length=0;
    //   // console.log(io.sockets.adapter.rooms.get(onlineUsers[socket.id][1]).size);
    //   // var length=io.sockets.adapter.rooms.get(onlineUsers[socket.id][1]).size;
    //   console.log(`✋ ${onlineUsers[socket.id][0]} has left the chat! ✋`);
    //   socket.to(onlineUsers[socket.id][1]).emit("showsomeoneleft",onlineUsers[socket.id][0],length);
    //   } 
    //   // socket.to(data.room).emit("user-left",onlineUsers[socket.id]);
    // });
});

server.listen(3001,()=>console.log("SERVER RUNNING"));
