import { useEffect, useState } from "react";
import AudioRecorder from "../components/AudioRecorder";
import Pipa from "../components/Pipa";
export default function HomePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordName, setRecordName] = useState("");
  let i = 0;
  let intervalId;

  const getAudioChunks = () => {
    return audioChunks;
  };

  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        if (!isPlaying || i >= audioChunks.length) {
          clearInterval(intervalId);
          setIsPlaying(false);
          return;
        }
        const element = document.getElementById(audioChunks[i]);
        new Audio(element.src).play();
        i = i + 1;
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
      i = 0;
    };
  }, [isPlaying, audioChunks]);

  const playRecording = () => {
    setIsPlaying(true);
  }

  const stopPlaying = () => {
    setIsPlaying(false);
  }

  const saveRecording = () => {
    const textEncoder = new TextEncoder();
    const binaryData = audioChunks
      .map((audio) => textEncoder.encode(audio))
      .reduce((acc, chunk) => new Uint8Array([...acc, ...chunk]), new Uint8Array());
    const record = {
      userId: "0db6e114-6121-4879-a688-59a5754ef10f",
      recordTitle: recordName,
      audioFile: binaryData,
    };
    fetch("http://localhost:8080/api/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then((data) => console.log("Response: ", data));
  };

  return (
    <>
      <Pipa isRecording={isRecording} setAudioChunks={setAudioChunks} />
      <AudioRecorder
        isRecording={isRecording}
        setRecording={setIsRecording}
        audioChunks={audioChunks}
        setAudioChunks={setAudioChunks}
        getAudioChunks={getAudioChunks}
        isPlaying={isPlaying}
        stopPlaying={stopPlaying}
        playRecording={playRecording}
        setRecordName={setRecordName}
        saveRecording={saveRecording}
      />
      <div className="content">
        <h2>Playing instructions</h2>
        <p>
          You can play either using the keyboard, or by clicking the strings. In
          keyboard mode, you can play the notes marked by the active region (the
          region inside the rectangle).
        </p>
        <p>To toggle the active region, use the left and right keys.</p>
        <p>
          The keyboard Pipa is designed to mimic the actual Pipa. The four rows
          on the keyboard represent the four strings in the pipa, the first
          string being the number row, the second string is the row that starts
          with 'Q', the third string is the row that starts with 'A', and the
          fourth string is the row that starts with 'Z'.
        </p>
      </div>
    </>
  );
}
