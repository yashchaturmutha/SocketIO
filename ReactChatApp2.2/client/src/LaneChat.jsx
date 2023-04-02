import React from 'react'
import {useState,useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function LaneChat({username,socket,lane,room,userLeft,lrdata}) {

  const [currentMessage, setCurrentMessage] = useState("");
  const [someoneLeft,setSomeoneleft]=useState("");
  const [messageList, setMessageList] = useState([]);
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
        console.log("In sendMessage Lane");
        console.log("username "+username);
        console.log("lane "+lane);
        console.log("room "+room);

        const messageData = {
          lane: lane,
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
  
        await socket.emit("send_message_Lane", messageData);
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

        socket.on("showsomeonejoinedLane",(data)=>{
          // setSomeoneleft(username+" Left the Chat");
        console.log("showsomeonejoinedLane");
        console.log("lane: "+lane);
        console.log("lrdata: "+data.lrdata.lane);

        if(data.lrdata.lane === lane){
          setMessageList((list) => [...list, {
            lane: null,
            author: null,
            message: data.username+" Joined the Lane",
            time: null
          }]);
          // console.log(data.username +" joined Lane");
        }
        });

        socket.on("showsomeoneleftLane",(data)=>{
        // setSomeoneleft(username+" Left the Chat");
        console.log("showsomeoneleftLane");
        console.log("lane: "+lane);
        console.log("lrdata: "+data.lrdata.lane);

        if(data.lrdata.lane === lane){
          console.log(data.username +" left Lane");
        // console.log("qq"!==username);
        setMessageList((list) => [...list, {
          lane: null,
          author: null,
          message: data.username+" Left the Lane",
          time: null
        }]);
        // setroomCount( roomcount => ({...roomcount,room:roomcount.room-1 } ));
        }
      });

        // setMessageList(messageList.filter((obj) =>obj.author !== username));
      socket.on("receive_message_Lane", (data) => {
      
      console.log("In receive_message_Lane");
      console.log("username "+username);
      console.log("lane "+lane);
      console.log("room "+room);
      
      if(data.lrdata.lane === lane){
      setMessageList((list) => [...list, data]);
      }
      // console.log(data);
      });

      socket.on("receive_message_Master_Lane", (data) => {
      
        console.log("In receive_message_Master_Lane");
        // console.log("username "+username);
        console.log("lane "+data.lane);
        // console.log("room "+room);
        
        if(data.lane === lane){
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
        <p style={{textAlign:'center' , color:'grey'}}>LANE CHAT</p>
        <p>UserName : {username} | LaneID : {lane} | RoomID : {room}</p>
        <p><span style={{color: 'green'}}>●</span>  Online Users : xyz</p>
      </div>

      <div className="chat-body">
      
      <ScrollToBottom className="message-container">
      {messageList.map((messageContent,index) => {
      return (
        messageContent.lane!==null? 
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
      {/* <button onClick={userLeft} className='leave'>Leave Chat</button> */}
      <button onClick={()=>{setMessageList([])}} className='clear'>Clear Lane</button>
      </div>
    </div>
  )
}

export default LaneChat;