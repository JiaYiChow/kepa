import { Button, Card, Icon } from "semantic-ui-react";
import styles from "./RecordItem.module.css";

const RecordItem = ({ record, handleDelete }) => {

  return (
    <div className={styles["record-item"]}>
      <Card raised>
        <Card.Content>
          {record.recordtitle}
          <Button
            basic
            inverted
            onClick={() => handleDelete(record.recordid)}
            className={styles.button}
          >
            <Icon name="close" className={styles.i} />
          </Button>
        </Card.Content>
        <Card.Description>
          <audio controls src={record.audiofile} />
        </Card.Description>
        <Card.Content extra>Created {record.recorddatetime}</Card.Content>
      </Card>
    </div>
  );
};

export default RecordItem;
