import React from 'react';
import './message.css'; // Make sure to include the CSS file
import { format } from 'timeago.js';

function Message({ message, own }) {
  
  return (
    <div className={own ? 'message own' : 'message'}>
      <div className="messageTop">
        <img
          src="https://th.bing.com/th/id/OIP.zOnAESkgHms3plaU8yCw4wHaK0?pid=ImgDet&rs=1"
          className="messageImg"
          alt="User Profile"
        />
        
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
