import './App.css';
import io from 'socket.io-client';
import {useState,useEffect} from 'react';
import RoomChat from './RoomChat';
import LaneChat from './LaneChat';
import MasterChat from './MasterChat';

//connecn to socket server
const socket=io.connect("http://192.168.1.149:3001");

function App() {

  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [lane,setLane]=useState("");
  const [showChat, setshowChat] = useState(false);

  const [userSocketID,setuserSocketID]=useState("");
  // const [message, setMessage] = useState({
  //   author: "",
  //   msg: ""
  // });
  const [lrdata,setLRdata] = useState({
    lane:0,
    room:0
  });
  const [roomcount,setroomCount]=useState({});
  
  // const [someoneLeft,setSomeoneleft]=useState(null);

  const joinRoom=()=>{

    if(room!=="" && username!=="" && userSocketID!=="" && lane!==""){

      console.log("joinRoom");

      // socket.auth({username});
      window.localStorage.setItem(username, JSON.stringify({
        username:username,
        room:room,
        lane:lane,
        userSocketID:userSocketID,
        socketID:socket.id
        }));
      
      console.log(socket);
      socket.emit("join_room",{username,lane,room,userSocketID,lrdata,showChat});
      setshowChat(true);
    }
  }

  const userLeft=()=>{
    // if(room!=="" && username!==""){
    console.log("userLeft");
    console.log(JSON.parse(window.localStorage.getItem(username)).username);
    socket.emit("user-left",{username,lane,room,lrdata});
    // setRoom("");
    setshowChat(false);
    // }
  }

  const userReconnect=()=>{
    console.log("Reconnect");
    console.log(localStorage.getItem(username) !== null);
    console.log(username);
    
    if(localStorage.getItem(username) !== null)
    {
      console.log("userReconnect");
      const userObj=JSON.parse(window.localStorage.getItem(username));
      setUsername(userObj.username);
      setRoom(userObj.room);
      setuserSocketID(userObj.userSocketID);
      setLane(userObj.lane);
      joinRoom();
    }
  }

  // useEffect(() => {
  //   socket.on("showsomeoneleft",(username)=>{
  //     setSomeoneleft(username);
  //   });
  // }, [socket]);
  

  return (
    <div className="App">
      {showChat=="master"?
      <MasterChat socket={socket} setshowChat={setshowChat}/>
      :
      <>
      {!showChat?
      <div className="joinChatContainer">
        <h3>React App</h3>

        <input type="text" placeholder="John.." onChange={(e)=>{setUsername(e.target.value)}}/>

        <input type="text" placeholder="SocketID..." onChange={(e)=>{setuserSocketID(e.target.value)}}/>

        <input type="text" placeholder="LaneID.." 
        onChange={(e)=>{
          setLane(e.target.value)
          setLRdata({...lrdata,lane:e.target.value})
          }}/>

        <input type="text" placeholder="RoomID.." 
        onChange={(e)=>{
          setRoom(e.target.value)
          setLRdata({...lrdata,room:e.target.value})
          }}/>  
    
        <button onClick={joinRoom}>Join Room</button>

        <button className='reconnect' onClick={userReconnect}>Reconnect Chat</button>

        <button onClick={()=>{
          console.log("Join as Master");
          setshowChat("master");
        }}>Join as Master</button>
    </div>:

    <div className='roomLaneChat'>

      <div className='chat-box'>
      <RoomChat username={username} socket={socket} lane={lane} room={room}  userLeft={userLeft} lrdata={lrdata}
      // roomcount={roomcount} setroomCount={setroomCount}
      //  someoneLeft={someoneLeft} setSomeoneleft={setSomeoneleft}
      />     
      </div>

      <button onClick={userLeft} className='leave'>Leave Chat</button>
      
      <div className='chat-box'>
      <LaneChat username={username} socket={socket} lane={lane} room={room}  userLeft={userLeft} lrdata={lrdata}/>
      </div>

    </div>
     }
     </>
     }
    </div>
  );
}

export default App;
