import React, { useEffect, useRef, useState } from "react";
import "./massenger.css";
import Conversation from "../../components/conversation/Conversation";
import axios from "axios";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Navbar from "../../components/Layout/Navbar";
import jwt_decode from "jwt-decode";
import TokenService from "../../services/tokenService";
import io from "socket.io-client"; // Import socket.io-client

const socket = io("http://localhost:5003"); // Replace with your server URL

function Massenger() {
  const [currentUser, setCurrentUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef();

  const userID = jwt_decode(TokenService.getToken())?.id;

  // GET user by ID
  const getCurrentUser = async () => {
    try {
      const res = await axios.get(`http://localhost:5003/user/${userID}`);
      setCurrentUser(res?.data[0]);
      console.log("Current-user", res?.data[0]?.email);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // GET conversations by user ID
  const getConversations = async () => {
    try {
      const res = await axios.get(`http://localhost:5003/conversation/${userID}`);
      setConversations(res.data);
      console.log("Conversations", res.data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // GET messages by conversation ID
  const getMessages = async (conversationId) => {
    try {
      const res = await axios.get(`http://localhost:5003/message/${conversationId}`);
      setMessages(res.data);
      console.log("Messages", res.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleConversationClick = (conversation) => {
    setCurrentConversation(conversation);
    getMessages(conversation._id); // Fetch messages for the selected conversation
  };

  // Callback function to start a new conversation
  const startConversation = async (friendId) => {
    // Create a new conversation or retrieve an existing one with friendId
    try {
      const res = await axios.post("http://localhost:5003/conversation", {
        members: [userID, friendId],
      });
      handleConversationClick(res.data); // Start the new conversation
      console.log(res.data);
    } catch (error) {
      console.error("Error starting a conversation:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      ConversationId: currentConversation._id,
      sender: userID,
      text: newMessage,
    };
    try {
      const res = await axios.post("http://localhost:5003/message", message);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      // Update the newMessage state after successfully sending the message
      setNewMessage(""); // Clear the message input after sending

      // Emit a "chatMessage" event to the server
      socket.emit("chatMessage", {
        roomId: currentConversation._id,
        message: newMessage, // Send the message content
        decodedToken: jwt_decode(TokenService.getToken()),
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Listen for "message" events from the server
  useEffect(() => {
    socket.on("message", (data) => {
      // Handle incoming messages and update your state accordingly
      // For example, you can add the received message to the messages state
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [userID]);

  useEffect(() => {
    if (userID) {
      getConversations();
    }
  }, [userID]);


  //for scrollings
  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="massenger">
      <Navbar />

      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            type="text"
            placeholder="search for friends"
            className="chatMenuInput"
          />
          {conversations?.map((conversation, index) => (
            <div
              key={index}
              onClick={() => handleConversationClick(conversation)}
              className={`conversationItem ${
                conversation._id === currentConversation?._id ? "active" : ""
              }`}
            >
              <Conversation
                key={index}
                conversationData={conversation}
                currentUser={currentUser}
              />
              
            </div>
          ))}
        </div>
      </div>

      <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentConversation ? (
            <div className="chatBoxTop" ref={scrollRef}>
              {messages?.map((message, index) => (
                <div key={index}>
                  <Message message={message} own={message.sender === userID} />
                </div>
              ))}
            </div>
          ) : (
            <span>Open a conversation to start chatting</span>
          )}

          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="write something..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <button onClick={handleSubmit} className="chatSubmitButton">
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">
          <ChatOnline setCurrentConversation={setCurrentConversation} MyId={userID} startConversation={startConversation} />
        </div>
      </div>
    </div>
  );
}

export default Massenger;
