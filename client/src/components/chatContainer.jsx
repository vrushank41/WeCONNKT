import React, { useState, useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { SEND_MESSAGE_ROUTE, RECEIVE_MESSAGE_ROUTE } from "../utils/APIRoutes";
import "../stylesheets/chatContainer.scss"

const ChatContainer = ({ currentChat, socket }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [searchMessages, setSearchMessages] = useState('')

  useEffect(() => {
    // const data = {}
    const getData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(RECEIVE_MESSAGE_ROUTE, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
    getData()
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(import.meta.env.REACT_APP_LOCALHOST_KEY)
    );

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(SEND_MESSAGE_ROUTE, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  const handleSearchMessages = (e) => {
    setSearchMessages(e.target.value)
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="container-chatContainer">
      <div className="chat-header-chatContainer">
        <div className="user-details-chatContainer">
          <div className="avatar-chatContainer">
            <img
              className="img-chatContainer"
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username-chatContainer">
            <h3 className="h3-chatContainer">{currentChat.username}</h3>
          </div>
        </div>
        <div className="message-logout">
          <input type="text" className="message-search" placeholder="Search Messages..." value={searchMessages} onChange={handleSearchMessages} />
        </div>
      </div>
      <div className="chat-messages-chatContainer">
        {/* {console.log(messages)} */}
        {messages.filter(msg => msg.message.toLowerCase().includes(searchMessages.toLowerCase())).map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message-chatContainer ${message.fromSelf ? "sended-chatContainer" : "recieved-chatContainer"
                  }`}
              >
                <div className="content-chatContainer ">
                  <p className="p-chatContainer">{message.message}</p>
                  <p className="p-chatContainer">
                    <span style={{ "fontSize": "12px" }}>
                      {message.datetime ? new Date(message.datetime).toLocaleDateString() : new Date().toLocaleDateString()}
                    </span> &nbsp;
                    <span style={{ "fontSize": "10px" }}>
                      {/* {new Date(message.datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} */}
                      {message.datetime ? new Date(message.datetime).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </div>
  );
}

export default ChatContainer