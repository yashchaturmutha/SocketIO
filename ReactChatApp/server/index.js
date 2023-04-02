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

const io = new Server(server, {
    cors: {
      //telling our server which url is making calls to our socket io server
      // react server
      origin: "http://192.168.1.153:3000",
      methods: ["GET", "POST"],
    },
  });

io.on("connection",(socket)=>{
    console.log(`User Connected  ${socket.id}`);

    socket.on("send_message",(data)=>{
      // console.log(data);

      socket.to(data.room).emit("receive_message",data);
    })

    socket.on("join_room",(data)=>{
      socket.join(data);
      console.log(data);
    })
});

server.listen(3001,()=>console.log("SERVER RUNNING"));
