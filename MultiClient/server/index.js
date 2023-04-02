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
// const server = http.createServer(app);

// const io1 = new Server(server, {
//     cors: {
//       //telling our server which url is making calls to our socket io server
//       // react server
//       origin: "http://localhost:8001",
//       credentials: true,
//       methods: ["GET", "POST"],
//       transports: ['websocket', 'polling', 'flashsocket']
//     },
//   });

//   const io2 = new Server(server, {
//     cors: {
//       //telling our server which url is making calls to our socket io server
//       // react server
//       origin: "http://localhost:8002",
//       credentials: true,
//       methods: ["GET", "POST"],
//       transports: ['websocket', 'polling', 'flashsocket']
//     },
//   });


// io.on("connection",(socket)=>{
//     console.log(`User Connected  ${socket.id}`);

//     socket.on("join_room",(data)=>{
//       socket.join(data);
//     })

//     socket.on("send_message",(data)=>{
//         //msg sent to all except urself
        
//         // socket.broadcast.emit("receive_message",data);
//         socket.to(data.room).emit("receive_message",data);
//     })
// });

// io1.on('connection',  (socket) =>{
//     // socket.emit('news', { hello: 'world' })
//     console.log("8001");
//     });

// io2.on('connection', (socket) =>{
//     // socket.emit('flash', { hello: 'world' })
//     console.log("8002");
//     });

let http1 = http.createServer(app);
let io = require('socket.io')(http1);

io.on('connect', function (socket) {

});

http1.listen(7000, '::1', function () {
  console.log("7000");
    // Now listening
});

let http2 = http.createServer(app);
let io2 = require('socket.io')(http2);

http2.listen(7001, '::1', function () {
  console.log("7001");
    // Now listening
});

io2.on('connect', function(socket){

});

// server.listen(3001,()=>console.log("SERVER RUNNING"));
