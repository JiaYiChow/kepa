import { Button, Card, Icon } from "semantic-ui-react";

const RecordItem = ({ record }) => {
  const handleDelete = () => {
    const deleteRecording = async () => {
      const response = await fetch(
        `http://localhost:8080/api/records/${record.recordId}`, 
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json', // Set the appropriate Content-Type for your request
          }}
      );
      if (!response.ok) {
        throw new Error("Error deleting recordings");
      }
    };
    deleteRecording();
  }
  return (
    <div>
      <Card header={record.recordTitle}>
        <Card.Content>
          {record.recordTitle}
          <Button basic inverted onClick={handleDelete}>
            <Icon name="close" />
          </Button>
        </Card.Content>
        <Card.Description>
          <audio controls src={record.audioFile} />
        </Card.Description>
        <Card.Content extra>Created {record.recordDateTime}</Card.Content>
      </Card>
    </div>
  );
};

export default RecordItem;
