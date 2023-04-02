import React from 'react'
import {useState,useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function MasterChat({socket,setshowChat}) {

  const [currentMessage, setCurrentMessage] = useState("");
//   const [someoneLeft,setSomeoneleft]=useState("");
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
        console.log("In sendMessage Master");
        // console.log("username "+username);

        const messageData = {
          author: "MASTER",
          message: currentMessage,
          time:
            formattedToday+
            ' '.repeat(10)+
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
  
        await socket.emit("send_message_Master", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }

  return (
    
    <div className="chat-window">

      <div className="chat-header">
        {/* <p>Live Chat </p> */}
        <p style={{textAlign:'center' , color:'grey'}}>MASTER CHAT</p>
        <p><span style={{color: 'green'}}>●</span>  Total Lanes : xyz</p>
      </div>

      <div className="chat-body">
      
      <ScrollToBottom className="message-container">
      {messageList.map((messageContent) => {
      return (
        // messageContent.lane!==null? 
        <div className="message" id= "you">
        <div>
            <div className="message-content">
            <p>{messageContent.message}</p>
            </div>
            
            <div className="message-meta">
            <p id="time">{messageContent.time}</p>
            {/* <p id="author">{messageContent.author}</p> */}
            </div>
        </div>
        </div>
        // :
        // <div className="message-notify">
        // <p>{messageContent.message}</p>
        // </div>
        )})}
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
      <button onClick={()=>{setMessageList([])}} className='clear'>Clear Master</button>
      <button onClick={()=>{setshowChat(false)}} className='leave'>Leave Master</button>
      </div>
    </div>
  )
}

export default MasterChat;