import React from 'react'
import {useState,useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function RoomChat({username,socket,lane,room,userLeft,lrdata}) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [someoneLeft,setSomeoneleft]=useState("");
  const [messageList, setMessageList] = useState([]);
  const [roomcount,setroomCount]=useState(0);
  // const[leavemessage,setLeavemessage]=useState();

  const sendMessage = async () => {
    if (currentMessage.trim() !== "") {

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;
        console.log("In sendMessage");
        console.log("username "+username);
        console.log("lane "+lane);
        console.log("room "+room);

        const messageData = {
          room: room,
          author: username,
          message: currentMessage,
          time:
            formattedToday+
            ' '.repeat(10)+
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
            lrdata:lrdata  
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }

    // will run for users meant to receive msgs , not the one who sent msg
    useEffect(() => {

      // socket.on("room-user-count",(data)=>{

      //   console.log("room-user-count");
      //   console.log(data);
      //   console.log("data.lrdata.room "+data.lrdata.room);
      //   console.log("room "+room);
      //   console.log(roomcount);room-user-count
      //   // console.log("countData.roomLength "+countData.roomLength);
      //   // console.log(countData.data.lrdata.room==room);

      //   if(data.lrdata.room==room)
      //   {
      //   console.log("roomcount.room "+roomcount.room);
      //   if(roomcount.room!==undefined)
      //   setroomCount( roomcount => ({...roomcount,room:roomcount.room+1 } ));
      //   else
      //   setroomCount( roomcount => ({...roomcount,room:1 } ));
      //   }
      // });

      // socket.on("room-user-count",(head)=>{
      //   console.log("room-user-count");
      //   console.log(head.data);
      //   console.log("data.lrdata.room "+head.data.lrdata.room);
      //   console.log("room "+room);
      //   console.log("roomLength "+head.roomLength);
      //   console.log("roomcount "+roomcount);
      //   console.log(head.data.lrdata.room==room);

      //   if(head.data.lrdata.room==room)
      //   setCount(head.roomLength);
      // });

      socket.on("showsomeonejoinedRoom",(data)=>{
        // setSomeoneleft(username+" Left the Chat");
        console.log("showsomeonejoinedRoom");
        console.log("room: "+room);
        console.log("lrdata: "+data.lrdata.room);

        if(data.lrdata.room === room){
          setMessageList((list) => [...list, {
            room: null,
            author: null,
            message: data.username+" Joined the Room",
            time: null
          }]);
        }
        });

        socket.on("showsomeoneleftRoom",(data)=>{
        // setSomeoneleft(username+" Left the Chat");
        console.log("showsomeoneleftRoom");
        console.log("room: "+room);
        console.log("lrdata: "+data.lrdata.room);

        if(data.lrdata.room === room){
          console.log(data.username +" left Room");
        // console.log("qq"!==username);
        setMessageList((list) => [...list, {
          room: null,
          author: null,
          message: data.username+" Left the Room",
          time: null
        }]);
        // setroomCount( roomcount => ({...roomcount,room:roomcount.room-1 } ));
        }
      });

        // setMessageList(messageList.filter((obj) =>obj.author !== username));
      socket.on("receive_message", (data) => {
      
      console.log("In receive_message");
      console.log("username "+username);
      console.log("lane "+lane);
      console.log("room "+room);
      
      if(data.lrdata.room === room){
      setMessageList((list) => [...list, data]);
      }
      // console.log(data);
    });

    socket.on("receive_message_Master_Room", (data) => {
      
    console.log("In receive_message_Master_Room");
    // console.log("username "+username);
    console.log("room "+data.room);
    // console.log("room "+room);
    
    if(data.room === room){
    setMessageList((list) => [...list, data.messageData]);
    }
    // console.log(data);
    });

    }, [socket,lane,room]);
    // })

  return (
    
    <div className="chat-window">

      <div className="chat-header">
        {/* <p>Live Chat </p> */}
        <p style={{textAlign:'center' , color:'grey'}}>ROOM CHAT</p>
        <p>UserName : {username} | LaneID : {lane} | RoomID : {room}</p>
        <p><span style={{color: 'green'}}>●</span>  Online Users : xyz</p>
      </div>

      <div className="chat-body">
      
      <ScrollToBottom className="message-container">
      {messageList.map((messageContent) => {
      return (
        messageContent.room!==null? 
        <div className="message" id={messageContent.author === username ? "you" :
        messageContent.author==="MASTER"? "MASTER":"other"}>
        <div>
            <div className="message-content">
            <p>{messageContent.message}</p>
            </div>
            
            <div className="message-meta">
            <p id="time">{messageContent.time}</p>
            <p id="author">{messageContent.author}</p>
            </div>
        </div>
        </div>
        :
        <div className="message-notify">
        <p>{messageContent.message}</p>
        </div>
        )})}
       {/* <h2>{someoneLeft}</h2> */}
        </ScrollToBottom>

      </div>
      
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}/>

        <button onClick={sendMessage}>&#9658;</button>
      </div>
      
      <div>
      
      <button onClick={()=>{setMessageList([])}} className='clear'>Clear Room</button>
      </div>
    </div>
  )
}

export default RoomChat;