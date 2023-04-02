import "./App.css";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://192.168.1.52:3001");

function App() {
  const [username, setUsername] = useState("");
  const [count,setCount] = useState(0);
  const [roomno, setRoomno] = useState(0);
  const [laneno, setLaneno] = useState(0);
  const [showroom, setShowroom] = useState(false);
  const [message, setMessage] = useState({
    author: "",
    msg: "",
  });
  const [messagelist, setMessagelist] = useState([]);
  const [showaddleft, setShowaddleft] = useState(false);
  const [addleftlane, setAddleftlane] = useState("");
  const [addleftroom, setAddleftroom] = useState("");
  const [error,setError] = useState("");
  
  useEffect(() => {
    socket.on("noofremaininguser",(data)=>{
      setCount(data);
    })
    socket.on("noofuser",(data)=>{
      setCount(data)
    })
    socket.on("messageSent", (data) => {
      setMessagelist([...data.messagelist, data.message]);
    });
    socket.on("userjoinedlaneno", (data) => {
      // setMessagelist([...data.messagelist,{msg:data}]);
      setAddleftlane(`${data.username} joined Lane.`);
    });
    socket.on("userjoinedroomno", (data) => {
      setAddleftroom(`${data.username} joined Room.`);
    });
    socket.on("userleftlaneno", (data) => {
      setAddleftlane(`${data.username} leaved Lane.`);
    });
    socket.on("userleftroomno", (data) => {
      setAddleftroom(`${data.username} leaved Room.`);
    });
  }, [socket]);

  const joinRoom = (e) => {
    e.preventDefault();
    if(roomno!=0 && laneno!=0 && username!=""){
    setShowroom(true);
    setShowaddleft(true);
    socket.emit("joinRoom", {
      username: username,
      roomno: roomno,
      messagelist: messagelist,
      laneno: laneno,
    });
  }else if(roomno ===0 || laneno === 0 || username === ""){
    setError("please give inputs")
  }
  };

  const showMessages = () => {
    socket.emit("sendMessage", {
      roomno: roomno,
      messagelist: messagelist,
      username: username,
      message: message,
    });
    setMessage({msg:""})
  };

  const leaveChat = (e) => {
    // window.location.reload(false);
    e.preventDefault();
    setShowroom(false);
    // setUsername("");
    // setLaneno();
    // setRoomno();
    setMessagelist([]);
    // setCount(count-1)
    socket.emit("leavechat", {
      laneno: laneno,
      roomno: roomno,
      username: username,
      count:count
    });
  };

  return (
    <div >
      {!showroom && (
        <div>
          <h1>Chat Room</h1>
          <section>
            <h3 style={{ display: "inline" }}>Username:-</h3>
            <input
              type="text"
              placeholder="Enter Username..."
              name="username"
              style={{ display: "inline" }}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </section>
          <section>
            <h3 style={{ display: "inline" }}>Lane No:-</h3>
            <input
              type="text"
              placeholder="Enter LaneNo..."
              name="laneno"
              style={{ display: "inline" }}
              onChange={(event) => {
                setLaneno(event.target.value);
              }}
            />
          </section>
          <section>
            <h3 style={{ display: "inline" }}>Room No:-</h3>
            <input
              type="text"
              placeholder="Enter Room no..."
              name="roomno"
              style={{ display: "inline" }}
              onChange={(event) => {
                setRoomno(event.target.value);
              }}
            />
          </section>
          <div style={{color:"red"}}>{error}</div>
          <button onClick={joinRoom}>Join Room</button>
        </div>
      )}
      {showroom && (
        <div>
          <h3>
            Welcome to Lane:{laneno} & Room:{roomno}
          </h3>
          <section>
            <h4>
              Username:{username}&nbsp;&nbsp;&nbsp;LaneNo:{laneno}
              &nbsp;&nbsp;&nbsp;RoomNo:{roomno}&nbsp;&nbsp;&nbsp;
            </h4>
            <h4>🟢OnlineInRoom:{count}</h4>
          </section>
          <input
            type="text"
            placeholder="Enter Message..."
            name="message"
            value={message.msg}
            onChange={(event) => {
              setMessage({ author: username, data: event.target.value });
            }}
          />
          <button onClick={showMessages}>Send</button>
          <button onClick={leaveChat}>Leave</button>
          <ScrollToBottom className="scroll">
            {messagelist.map((file) => {
              if (file.data) {
                return (
                  <>
                    <h4 className={file.author === username ? "right" : "left"}>
                      {file.author}:{file.data}
                    </h4>
                  </>
                );
              }
            })}
          </ScrollToBottom>
          {showaddleft && addleftlane}
          <br />
          {showaddleft && addleftroom}
        </div>
      )}
    </div>
  );
}

export default App;
