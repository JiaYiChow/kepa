import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import { Card, Icon } from "semantic-ui-react";
import styles from "./RecordItem.module.css";

const RecordItem = ({ record, handleDelete }) => {
  const [audioURL, setAudioURL] = useState(null);

  useEffect(() => {
    const constructBlob = async () => {
      const base64Audio = record.audiofile;
      const audioBlob = new Blob([Buffer.from(base64Audio, "base64")], {
        type: "audio/mp4",
      });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudioURL(audioURL);
    };
    constructBlob();
  }, []);

  return (
    <>
      {audioURL ? (
        <div className={styles["record-item"]}>
          <Card raised>
            <Card.Content>
              {record.recordtitle}
              <Icon
                name="close"
                className={styles.i}
                onClick={() => handleDelete(record.recordid)}
              />
            </Card.Content>
            <Card.Description>
              <audio controls src={audioURL} />
            </Card.Description>
            <Card.Content extra>Created {record.recorddatetime}</Card.Content>
          </Card>
        </div>
      ) : null}
    </>
  );
};

export default RecordItem;
