import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext'
function Join() {

  const {ws}=useContext(RoomContext)
  const joinRoom=()=>{
    ws.emit("join-room","run")
  }
  return (
    <button className="bg-red-200 py-2 px-8 hover:bg-red-600" onClick={joinRoom}>
    Start Meeting
  </button>
  )
}

export default Join