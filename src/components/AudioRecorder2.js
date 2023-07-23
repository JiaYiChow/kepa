// AudioRecorder.js
import React, { useEffect, useRef, useState } from 'react';

const AudioRecorder2 = ({ audioElements }) => {
  const [mediaStream, setMediaStream] = useState(null);
  const mediaStreamDestinationRef = useRef(null);

  useEffect(() => {
    // Initialize the MediaStream only once
    if (!mediaStream) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      mediaStreamDestinationRef.current = mediaStreamDestination;

      audioElements.forEach((audioElement) => {
        const audioSource = audioContext.createMediaElementSource(audioElement);
        audioSource.connect(mediaStreamDestination);
      });

      const stream = mediaStreamDestination.stream;
      setMediaStream(stream);
    }
  }, [audioElements, mediaStream]);

  return null;
};

export default AudioRecorder2;
