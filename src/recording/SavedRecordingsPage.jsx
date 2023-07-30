import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import RecordItem from "./RecordItem";
import styles from "./SavedRecordingsPage.module.css";

const SavedRecordingsPage = () => {
  const [recordings, setRecordings] = useState([
    {
      id: 1,
      recordTitle: "My first recording",
      audioFile: "/kepa/assets/sounds/A2_4.m4a",
      recordDateTime: "24 May 2023",
    },
  ]);

  useEffect(() => {
    const fetchRecordings = async () => {
      // const response = await fetch(
      //   `http://localhost:8080/api/records/user/${userid}`
      // );
      // if (!response.ok) {
      //   throw new Error("Error fetching recordings");
      // }
      // const recordings = await response.json();
      // setRecordings(data);
    };
    // fetchRecordings();
  }, []);
  return (
    <div className={styles.recordings}>
      <h1>My Recordings</h1>
      <Card.Group className={styles.recordings} itemsPerRow={6}>
        {recordings.map((record) => (
          <RecordItem key={record.id} record={record} />
        ))}
      </Card.Group>
    </div>
  );
};

export default SavedRecordingsPage;
