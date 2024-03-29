import Message from "../components/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth.context";
import Conversation from "../components/Conversation";
import axios from "axios";
import { io } from "socket.io-client";
import { Link } from "react-router-dom";

const API_URL = "https://fahrradmarket.cyclic.app";
const API_URL2 = "http://localhost:5005"


export default function Conversations() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:5005");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      console.log(user);
      if (!user) return
      try {
        const res = await axios.get(`${API_URL2}/conversations/` + user?._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${API_URL2}/messages/` + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    if(message.text == "") return
    
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });  

    try {
      const res = await axios.post(`${API_URL2}/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit((e)=> (e))
    }
  }

  return (
    <>
    {!user ? (<div className="errormessage">    This page is only for Logged in users <div>¯\_(ツ)_/¯</div> <button><Link to="Login">Log In</Link></button></div>): <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
          {!conversations? <>You dont have any conversation yet </> : <>{conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} </>}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Press enter to send somehting..."
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>}
      
    </>
  );
}