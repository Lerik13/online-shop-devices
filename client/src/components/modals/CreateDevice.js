import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

const CreateDevice = ({show, onHide}) => {
	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add new Device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						placeholder={"Input name of new Type"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={onHide}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateDevice;