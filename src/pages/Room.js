import React, { useContext, useEffect } from 'react';
import Create from '../components/CreateButton';
import { useParams } from 'react-router-dom';
import { RoomContext } from '../context/RoomContext';
import VedioPlayer from '../components/VedioPlayer';

function Room() {
  const { id } = useParams();
  const { ws, me, leaveRoom, stream ,peers} = useContext(RoomContext);

  useEffect(() => {
    if (me) {
      console.log({ roomId: id, peerId: me.id });
      ws.emit('join-room', { roomId: id, peerId: me.id });
    }

    return () => {
      if (me) {
        ws.emit('leave-room', { roomId: id, peerId: me.id });
      }
    };
  }, [id, me, ws]);

  return (
    <>
      <button onClick={leaveRoom}>Leave Room</button>
      <p>Room ID: {id}</p>
      <div className='flex flex-row '>
        my video
      <VedioPlayer stream={stream} /> {/* Removed unnecessary curly braces */}
      others
      
      {Object.values(peers).map(peer=>(
        <div className='flex flex-row'>

          <VedioPlayer stream={peer.stream} />
        </div>
      )
      
      )}
      </div>
    </>
  );
}

export default Room;
