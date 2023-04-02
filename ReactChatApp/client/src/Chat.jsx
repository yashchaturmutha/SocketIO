import React from 'react'
import {useState,useEffect} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({username,socket,room}) {

  const [currentMessage, setCurrentMessage] = useState("");

  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {

        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1; // Months start at 0!
        let dd = today.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = dd + '/' + mm + '/' + yyyy;

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
        };
  
        await socket.emit("send_message", messageData);
        setMessageList((list) => [...list, messageData]);
        setCurrentMessage("");
      }
    }

    // will run for users meant to receive msgs , not the one who sent msg
    useEffect(() => {
        socket.on("receive_message", (data) => {
        setMessageList((list) => [...list, data]);
        // console.log(data);
        });
      }, [socket]);

  return (
    <div className="chat-window">

      <div className="chat-header">
        <p>Live Chat </p>
        <p>Username : {username} , RoomID : {room}</p>
      </div>

      <div className="chat-body">

      <ScrollToBottom className="message-container">
      {messageList.map((messageContent) => {
      return (

      <div className="message" id={username === messageContent.author ? "you" : "other"}>
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

    </div>
  )
}

export default Chat;