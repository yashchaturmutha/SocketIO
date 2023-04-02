// import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

//connecn to socket server
const socket=io.connect("http://localhost:3001");

function App() {

  const [message,setMessage]=useState("");
  const [messageReceived,setmessageReceived]=useState("");
  const [room,setRoom]=useState("");

  const sendMessage=()=>{
    // socket.emit("send_message",message);
    // socket.emit("send_message",{message , room});
    socket.emit("send_message",{message:message , room:room});
    setmessageReceived("");
    // setMessage("");
  }

  const joinRoom=()=>{

    if(room!==""){
    socket.emit("join_room",room);
    // setRoom("");
    }
  }

  useEffect(()=>{
   socket.on("receive_message",(data)=>{
  //  alert(data.message);
   setmessageReceived(data.message);
   }) 
  },[socket]);

  return (
    <div className="App">
     <input placeholder='Enter Room' onChange={(e)=>setRoom(e.target.value)} value={room}></input>
     <button onClick={joinRoom}>Join Room</button>
     <input placeholder='Enter Message' onChange={(e)=>setMessage(e.target.value)} value={message}></input>
     <button onClick={sendMessage}>Send Message</button>

     <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
