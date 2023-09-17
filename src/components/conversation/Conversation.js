import React, { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";
function Conversation({ conversationData, currentUser }) {
  const [friend, setFriend] = useState(null);
  const [test, settest] = useState()
  useEffect(() => {
    const friendId = conversationData.members.find(
      (m) => m !== currentUser._id
    ).user;
    settest(
    conversationData.members.find(
      (m) => m !== currentUser._id
    ));
    // console.log("f",friendId);
    const getFriend = async () => {
      try {
        const res = await axios(
          `http://localhost:5003/user/${friendId}`
        );
        // console.log("friens=>", res.data[0].email);
        setFriend(res.data[0])
      } catch (error) {
        console.log(error);
      }
    };
    getFriend();
  }, [currentUser, conversationData]);

  console.log(test)
  return (
    <div className="conversation">
      <img
        src={`http://localhost:5003/${test.profilePicture}`}
        className="conversationImg"
        alt=""
      />

      <span className="conversationName"> {test?.firstName}</span>
    </div>
  );
}

export default Conversation;
