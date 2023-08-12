import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";
import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import styles from "./AudioRecorder.module.css";
import SaveRecordingForm from "./SaveRecordingForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ffmpeg = createFFmpeg({ log: true });

const AudioRecorder = ({
  isRecording,
  setRecording,
  setAudioChunks,
  getAudioChunks,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [ffmpegReady, setffmpegReady] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordName, setRecordName] = useState("");

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
    const audioChunks = getAudioChunks();
    concatenateAudio(audioChunks);
  };

  const concatenateAudio = async (audioFiles) => {
    if (!ffmpegReady) {
      console.error("FFmpeg.js is not loaded yet.");
      return;
    }

    const fetchFilePromises = audioFiles.map((file) =>
      fetchFile(`kepa/assets/sounds/${file}.m4a`)
    );
    const inputArgs = await Promise.all(fetchFilePromises).then(
      (fileContents) => {
        return audioFiles.flatMap((file) => ["-i", `${file}.m4a`]);
      }
    );

    await Promise.all(fetchFilePromises).then((filecontents) =>
      audioFiles.map((file, idx) =>
        ffmpeg.FS("writeFile", `${file}.m4a`, filecontents[idx])
      )
    );

    try {
      await ffmpeg.run(
        ...inputArgs,
        "-filter_complex",
        `concat=n=${audioFiles.length}:v=0:a=1`,
        "output.mp3"
      );

      const data = ffmpeg.FS("readFile", "output.mp3");
      const audioBlob = new Blob([data.buffer], { type: "audio/mp4" });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudio(audioURL);
      setAudioBlob(audioBlob);
    } catch (error) {
      console.error("Failed to concatenate audio files:", error);
    }

    audioFiles.map((file) => ffmpeg.FS("unlink", `${file}.m4a`));
    ffmpeg.FS("unlink", "output.mp3");
  };

  const saveRecording = () => {
    const record = {
      userId: "0db6e114-6121-4879-a688-59a5754ef10f",
      recordTitle: recordName,
    };
    const formData = new FormData();
    formData.append("recordData", JSON.stringify(record));
    formData.append("audioFile", audioBlob);

    fetch("http://localhost:8080/api/records", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => 
        toast.success("Recording successfully created!", {
          position: toast.POSITION.BOTTOM_CENTER
        })
      );
  };

  useEffect(() => {
    const loadFFmpeg = async () => {
      if (!ffmpeg.isLoaded()) {
        const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.1/dist/umd";
        await ffmpeg.load({
          coreURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.js`,
            "text/javascript"
          ),
          wasmURL: await toBlobURL(
            `${baseURL}/ffmpeg-core.wasm`,
            "application/wasm"
          ),
        });
      }
      setffmpegReady(true);
    };

    loadFFmpeg();
  }, []);

  return (
    <div>
      {ffmpegReady ? (
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
          {audio ? (
            <>
              <div className={styles["audio-container"]}>
                <audio src={audio} controls></audio>
                <a download href={audio}>
                  Download Recording
                </a>
              </div>

              <SaveRecordingForm
                open={openModal}
                setOpen={setOpenModal}
                setRecordName={setRecordName}
                saveRecording={saveRecording}
                trigger={<Button onClick={setOpenModal}>Save Recording</Button>}
              />
            </>
          ) : null}
          <ToastContainer />
        </div>
      ) : null}
    </div>
  );
};

export default AudioRecorder;
