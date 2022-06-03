import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceAPI';
import {toast} from 'react-toastify'

const CreateBrand = ({show, onHide}) => {
	const [value, setValue] = useState('')

	const addBrand = () => {
		createBrand({name: value.trim()}).then(data => {
			if (data instanceof Error) {
				toast.error(data.message)
			} else {
				setValue('')
				onHide()
				toast.success("Brand was successfully created")
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
					Add new Brand
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={"Input name of new Brand"}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={addBrand}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default CreateBrand;