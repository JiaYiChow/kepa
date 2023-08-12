import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import RecordItem from "./RecordItem";
import styles from "./SavedRecordingsPage.module.css";

const SavedRecordingsPage = () => {
  const [recordings, setRecordings] = useState([]);

  const handleDelete = (id) => {
    const deleteRecording = async () => {
      const response = await fetch(`http://localhost:8080/api/records/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Error deleting recordings");
      }
    };
    deleteRecording();
    setRecordings(recordings.filter((record) => record.recordid !== id));
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      const response = await fetch(
        `http://localhost:8080/api/records/user/0db6e114-6121-4879-a688-59a5754ef10f`
      );
      if (!response.ok) {
        throw new Error("Error fetching recordings");
      }
      const recordings = await response.json();
      setRecordings(recordings.records);
    };
    fetchRecordings();
  }, []);

  return (
    <div className={styles.recordings}>
      <h1>My Recordings</h1>
      <div className={styles.content}>
        <Card.Group centered itemsPerRow={2}>
          {recordings.map((record) => (
            <RecordItem
              key={record.recordid}
              record={record}
              handleDelete={handleDelete}
            />
          ))}
        </Card.Group>
      </div>
    </div>
  );
};

export default SavedRecordingsPage;
