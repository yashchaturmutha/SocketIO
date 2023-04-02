import './App.css';
import io from 'socket.io-client';
import {useState,useEffect} from 'react';
import Chat from './Chat';

//connecn to socket server
const socket=io.connect("http://192.168.1.153:3001/");

function App() {

  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [showChat, setshowChat] = useState(false);

  const joinRoom=()=>{
    if(room!=="" && username!==""){
    socket.emit("join_room",room);
    // setRoom("");
    setshowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat?
     <div className="joinChatContainer">
        <h3>React App</h3>

        <input type="text" placeholder="John.." onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="text" placeholder="RoomID.." onChange={(e)=>{setRoom(e.target.value)}}/>
        <button onClick={joinRoom}>Join Room</button>
     </div>:

     <Chat username={username} socket={socket} room={room}/>}

    </div>
  );
}

export default App;
