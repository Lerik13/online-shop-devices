import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviceAPI';
import {toast} from 'react-toastify'

const CreateType = ({show, onHide}) => {
	const [value, setValue] = useState('')

	const addType = () => {
		createType({name: value.trim()}).then(data => {
			if (data instanceof Error) {
				toast.error(data.message)
			} else {
				setValue('')
				onHide()
				toast.success("Type was successfully created")
			}
		})
	}

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					Add new Type
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={"Input name of new Type"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={addType}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateType;