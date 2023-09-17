import React, { useEffect, useRef } from 'react';

function VedioPlayer({ stream }) {
  const videoRef = useRef();

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return (
    <video className='w-[500px] h-[300px]' ref={videoRef} autoPlay controls  />
  );
}

export default VedioPlayer;
