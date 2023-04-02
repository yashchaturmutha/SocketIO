// import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import {useEffect, useState} from 'react';

//connecn to socket server
const socket=io.connect("http://localhost:3001", {transports: ['websocket', 'polling', 'flashsocket']});
// const socket2=io.connect("http://localhost:8002");
// const socket=io.connect(`http://localhost:${window.location.port}`);

function App() {

  const [message,setMessage]=useState("");
  const [messageReceived,setmessageReceived]=useState("");
  // const [socket,setSocket]=useState(io.connect(`http://localhost:${window.location.port}`));
  
  // const [room,setRoom]=useState("");

  const sendMessage=()=>{
    // socket.emit("send_message",message);
    // socket.emit("send_message",{message , room});

    // if(window.location.port=='8001')
    // socket1.emit("send_message",{message:message});
    // else if(window.location.port=='8002')
    socket.emit('send_message',{message:message});

    setmessageReceived("");
    // setMessage("");
  }

  // const joinRoom=()=>{

  //   if(room!==""){
  //   socket.emit("join_room",room);
  //   // setRoom("");
  //   }
  // }

  useEffect(()=>{
   
    // {setSocket(io.connect(`http://localhost:${window.location.port}`))}
    console.log(window.location.port);
    socket.on("receive_message",(data)=>{
    //  alert(data.message);
    setmessageReceived(data.message);
    }); 
  },[socket]);

  return (
    <div className="App">
     {/* <input placeholder='Enter Room' onChange={(e)=>setRoom(e.target.value)} value={room}></input> */}
     {/* <button onClick={joinRoom}>Join Room</button> */}
     <input placeholder='Enter Message' onChange={(e)=>setMessage(e.target.value)} value={message}></input>
     <button onClick={sendMessage}>Send Message</button>

     <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
