import { Button, Form, Input, Modal} from "semantic-ui-react";

const SaveRecordingForm = ({ open, setOpen, setRecordName, saveRecording, trigger }) => {

    const handleChange = (event) => {
        setRecordName(event.target.value);
    }
    const handleSave = () => {
        setOpen(false);
        setRecordName("");
        saveRecording();
    }
    
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>Create New Recording</Modal.Header>
      <Modal.Content>
        <Form>
            <Form.Field inline>
                <label>Record Name: </label>
                <Input onChange={handleChange} />
            </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button onClick={handleSave} positive >Save</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SaveRecordingForm;
