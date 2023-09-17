import React, { useContext } from 'react'
import { RoomContext } from '../context/RoomContext'

function Create() {
  const {ws}=useContext(RoomContext)
  const createRoom=()=>{
    ws.emit("create-room","run")
  }
  return (
    <button className="bg-red-200 py-2 px-8 hover:bg-red-600" onClick={createRoom}>
    create Meeting
  </button>
  )
}


export default Create