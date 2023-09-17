import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chatOnline.css";

function ChatOnline({ MyId, setCurrentConversation, socket,startConversation }) {
  const [users, setUsers] = useState([]);

  //gett all users
  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5003/profile");
      setUsers(response.data);
      console.log((response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const createConversation = async (user) => {
    try {
      const response = await axios.post("http://localhost:5003/conversation", {
        members: [MyId, user],
      });
   setCurrentConversation(response.data);
   

      // Emit a "join-room" event to the server to handle the conversation
      startConversation(user)
      socket.emit("join-room", {
        roomId: response.data,
        peerId: user,
      });
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="chatOnline">
      {users.map((user,index) => (
        <div key={index} className="chatOnlineFriend">
          <button onClick={() => createConversation(user)}>
            <div className="chatOnlineImgContainer">
              <img
                src={`http://localhost:5003/${user.profilePicture}`}
                alt=""
                className="chatOnlineImg"
              />
              {console.log(user.profilePicture)}
              <div className="chatOnlineBadge"></div>
            </div>
            <div className="chatOnlineName">{user.firstName}</div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
