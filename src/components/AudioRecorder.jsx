import { useEffect, useState, useRef } from "react";
import { Button } from "semantic-ui-react";
import "./AudioRecorder.css";

const mimeType = "audio/mpeg";
const AudioRecorder = ({audioElements}) => {
  const [stream, setStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audio, setAudio] = useState(null);
  const mediaRecorder = useRef(null);
  const mediaStreamDestinationRef = useRef(null);

  const startRecording = async () => {
    setIsRecording(true);
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

      let localAudioChunks = [];
      mediaRecorder.current.ondataavailable = (event) => {
        if (typeof event.data === "undefined") {
          return;
        }
        if (event.data.size === 0) {
          return;
        }

        localAudioChunks.push(event.data);
      };
      setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      console.log("here");
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudio(audioURL);

      setAudioChunks([]);
    };
  };

  useEffect(() => {
    // const setUpMicrophone = async () => {
    //   if ("MediaRecorder" in window) {
    //     try {
    //       const streamData = await navigator.mediaDevices.getUserMedia({
    //         audio: true,
    //         video: false,
    //       });
    //       setStream(streamData);
    //     } catch (err) {
    //       alert(err.message);
    //     }
    //   } else {
    //     alert("Recording is not supported in your browser.");
    //   }
    // };
    if (!stream && audioElements) {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const mediaStreamDestination = audioContext.createMediaStreamDestination();
        mediaStreamDestinationRef.current = mediaStreamDestination;
        // audioElements.forEach((audioElement) => {
        //     const audioSource = audioContext.createMediaElementSource(audioElement);
        //     audioSource.connect(mediaStreamDestination);
        //   });
          setStream(mediaStreamDestination.stream);       
          
    }
  }, [audioElements, stream]);

  return (
    <div className="audio-player">
      {!isRecording ? (
        <Button secondary onClick={startRecording}>
          Start Recording
        </Button>
      ) : null}
      {isRecording ? (
        <Button secondary onClick={stopRecording}>
          Stop Recording
        </Button>
      ) : null}
      {audio ? (
        <div className="audio-container">
          <audio src={audio} controls />
          <a download href={audio}>
            Download Recording
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
