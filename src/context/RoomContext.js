import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocketIoClient from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";
import { peerReducer } from "./peerReducer";
import { addPeerAction } from "./peerActions";
import TokenService from "../services/tokenService";

const url = "http://localhost:5003";

export const RoomContext = createContext(null);
const token=TokenService.getToken()
console.log("token==>",token);
const ws = SocketIoClient(url,{query:{token:token}});
console.log(ws);

export const RoomProvider = ({ children }) => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const [me, setMe] = useState(null);
  const [message, setMessage] = useState("");
  const [stream, setStream] = useState(null);
  const [peers, dispatch] = useReducer(peerReducer, {});

  const enterRoom = ({ roomId }) => {
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants }) => {
    console.log({ participants });
  };

  const leaveRoom = () => {
    if (me) {
      ws.emit("leave-room", { roomId, peerId: me.id });
      navigate("/");
    }
  };
  const sendMessage = () => {
    ws.emit("chatMessage", { roomId, message });
    setMessage("");
  };
  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId);

    peer.on("open", () => {
      console.log("My peer ID:", peer.id);
      setMe(peer);
    });

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
          console.log("Stream:", stream);
        })
        .catch((error) => {
          console.log("Error accessing media devices:", error.message);
        });
    } catch (error) {
      console.log("Error:", error.message);
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);

    return () => {
      peer.destroy();
      ws.off("room-created", enterRoom);
      ws.off("get-users", getUsers);
    };
  }, []);

  useEffect(() => {
    if (!me || !stream) return;

    ws.on("user-join", ({ peerId }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    me.on("call", (call) => {
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });
  }, [me, stream]);

  console.log({ peers });

  return (
    <RoomContext.Provider value={{ ws, me, leaveRoom, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
