import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import "../style/Conversation.css";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { Button } from "antd";

var socket = null

function Chat() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams()
  const userid = JSON.parse(localStorage.getItem("user"))._id;
  const [chattingWith, setChattingWith] = useState("")

  const getRoomId = (id1, id2) => {
    const sorted = [id1, id2].sort()
    return `${sorted[0]}---${sorted[1]}`
  }

  const [room, setRoom] = useState(getRoomId(id, userid))

  const getMessages = async () => {
    const response = await axios.post("/api/conversations/messages", { senderID: id, receiverID: userid })
    const newMessages = response.data.map(messageElement => {
      return {
        room,
        author: messageElement.senderID,
        message: messageElement.content,
        time:
          new Date(messageElement.sentAt).getHours() +
          ":" +
          new Date(messageElement.sentAt).getMinutes(),
      }
    })

    setMessageList(newMessages)
  }

  const getUsername = async () => {

    try {
      const response = await axios.get(`http://localhost:5000/api/conversations/username/${id}`)
      const data = await response.data
      setChattingWith(data.username)
    } catch (error) {
      console.log(error)
    }

  }
  
  useEffect(() => {
    getMessages()
    socket = io.connect("http://localhost:5008");


    getUsername()

    const receiveMessage = (data) => {
      console.log("receive message")
      setMessageList((list) => [...list, data]);
    }

    socket.emit('join_room', room)

    socket.on("receive_message", receiveMessage);

    socket.connect()

    return (() => {
      socket.disconnect()
      socket.off("receive_message")
    })
  }, [])


  const sendMessage = async () => {
    
    if (currentMessage == "")
      return

    const messageData = {
      room,
      author: userid,
      message: currentMessage,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);

    const response = await axios.post("/api/conversations/message", { senderID: userid, receiverID: id, content: currentMessage, sentAt: new Date() });

    setCurrentMessage("");


  };

  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  useEffect(() => {

  }, [socket]);

  return (
    <div className="Conversation">
      <div className="chat-window">
        <div className="chat-header">
          <p>{`Live Chat with `+chattingWith}</p>
          <p>{chattingWith}</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={userid === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                    </div>
                  </div>
                </div>
              );
            })}
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
            }}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>


      <Button onClick={handleGoBack}>Back</Button>
    </div>
  );
}

export default Chat;
