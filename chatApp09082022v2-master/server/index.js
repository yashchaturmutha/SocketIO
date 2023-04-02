const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const port = 3001;
const cors = require("cors");
app.use(cors());

const io = new Server(http, {
  cors: {
    origin: "http://192.168.1.52:3000",
    methods: ["GET", "POST"],
    pingTimeout:1000,
    pingInterval:500
  },
});

io.on("connection", (socket) => {
  console.log("User connected with id: " + socket.id);
  socket.on("disconnect", () => {
    console.log(`user disconnected with id: ${socket.id}`);
  });

  socket.on("joinRoom", (data) => {
    rooms = [data.roomno,data.laneno]
    // console.log(data.lrdata);
    // console.log(data);
    // console.log(data.laneno);
    // console.log(data.roomno);
    socket.join(rooms);
    console.log(socket.rooms);
    io.in(data.roomno).emit("noofuser",io.sockets.adapter.rooms.get(data.roomno).size);
    io.in(data.laneno).emit("userjoinedlaneno",{username:data.username,laneno:data.laneno,roomno:data.roomno,lrdata:data.lrdata});
    io.in(data.roomno).emit("userjoinedroomno",{username:data.username,laneno:data.laneno,roomno:data.roomno,lrdata:data.lrdata});
  });

  socket.on("sendMessage", (data) => {
    io.to(data.roomno).emit("messageSent", {
      username: data.username,
      message: data.message,
      messagelist: data.messagelist
    });
  });

  socket.on("leavechat",(data)=>{
    rooms = [data.roomno,data.laneno]
     socket.leave(rooms);
    // socket.leaveAll();
    socket.disconnect();
    //  socket.to(data.laneno).emit("userleftlaneno",{username:data.username});
    //  socket.to(data.roomno).emit("userleftroomno",{username:data.username});
    io.in(data.laneno).emit("userleftlaneno",{username:data.username});
    io.in(data.roomno).emit("userleftroomno",{username:data.username});
    io.in(data.roomno).emit("noofremaininguser",io.sockets.adapter.rooms.get(data.roomno).size)
  })
});

http.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
