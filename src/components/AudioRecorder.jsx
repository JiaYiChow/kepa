import { useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./AudioRecorder.module.css";
import SaveRecordingForm from "./SaveRecordingForm";

// const mimeType = "audio/mpeg";
const AudioRecorder = ({
  isRecording,
  setRecording,
  setRecordName,
  audioChunks,
  setAudioChunks,
  getAudioChunks,
  playRecording,
  saveRecording, 
  isPlaying, 
  stopPlaying
}) => {
  const [openModal, setOpenModal] = useState(false);
  // const [stream, setStream] = useState(null);
  // const [audioChunks, setAudioChunks] = useState(null);
  // const [audio, setAudio] = useState(null);
  // const mediaRecorder = useRef(null);
  // const mediaStreamDestinationRef = useRef(null);

  const startRecording = () => {
    setAudioChunks([]);
    setRecording(true);
    //   const media = new MediaRecorder(stream, { type: mimeType });
    //   mediaRecorder.current = media;
    //   mediaRecorder.current.start();

    //     let localAudioChunks = [];
    //     mediaRecorder.current.ondataavailable = (event) => {
    //       if (typeof event.data === "undefined") {
    //         return;
    //       }
    //       if (event.data.size === 0) {
    //         return;
    //       }

    //       localAudioChunks.push(event.data);
    //     };
    //     setAudioChunks(localAudioChunks);
  };

  const stopRecording = () => {
    setRecording(false);
    setAudioChunks(getAudioChunks());
    //   mediaRecorder.current.stop();
    //   mediaRecorder.current.onstop = () => {
    //     console.log("here");
    //     const audioBlob = new Blob(audioChunks, { type: mimeType });
    //     const audioURL = URL.createObjectURL(audioBlob);
    //     setAudio(audioURL);

    //     setAudioChunks([]);
    //   };
  };

  // const sampleRate = 48000;
  // const ctx = new (window.AudioContext || window.webkitAudioContext)( {"sampleRate": sampleRate} );

  // function concatAndPlay() {
  //   b1 = base64ToArrayBuffer( ogg48k.hello ).buffer;
  //   b2 = base64ToArrayBuffer( ogg48k.world ).buffer;
  //   ctx.decodeAudioData(b1, x=> ctx.decodeAudioData(b2, y=> {
  //     var audioSource = ctx.createBufferSource();
  //     audioSource.connect(ctx.destination);

  //     // Concatenate the two buffers into one.
  //     audioSource.buffer = appendBuffer(x, 1, y);
  //     audioSource.connect( ctx.destination );
  //     audioSource.start(0);
  //   } ) );

  //   // following code adapted from: https://stackoverflow.com/questions/14143652/web-audio-api-append-concatenate-different-audiobuffers-and-play-them-as-one-son
  //   function appendBuffer(buffer1, pause, buffer2) {
  //     var numberOfChannels = Math.min( buffer1.numberOfChannels, buffer2.numberOfChannels );
  //     var tmp = ctx.createBuffer( numberOfChannels, (buffer1.length + buffer2.length + pause*buffer1.sampleRate), buffer1.sampleRate );
  //     for (var i=0; i<numberOfChannels; i++) {
  //       var channel = tmp.getChannelData(i);
  //       channel.set( buffer1.getChannelData(i), 0);
  //       channel.set( buffer2.getChannelData(i), buffer1.length+pause*buffer1.sampleRate);
  //     }
  //     return tmp;
  //   }
  // }
  // useEffect(() => {

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
  // if (!stream && audioElements) {
  //     const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  //     const mediaStreamDestination = audioContext.createMediaStreamDestination();
  //     mediaStreamDestinationRef.current = mediaStreamDestination;
  //     // audioElements.forEach((audioElement) => {
  //     //     const audioSource = audioContext.createMediaElementSource(audioElement);
  //     //     audioSource.connect(mediaStreamDestination);
  //     //   });
  //       setStream(mediaStreamDestination.stream);

  //   }
  // }, [audioElements, stream]);

  return (
    <div className={styles["audio-player"]}>
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
      {!isRecording && audioChunks.length > 0 ? (
        <>
          {!isPlaying ? <Button onClick={playRecording}>Play Recording </Button>: <Button onClick={stopPlaying}>Stop Playing </Button>}
          <SaveRecordingForm
        open={openModal}
        setOpen={setOpenModal}
        setRecordName={setRecordName}
        saveRecording={saveRecording}
        trigger={<Button onClick={setOpenModal}>Save Recording</Button>}
      />
        </>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
