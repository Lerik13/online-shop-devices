import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceAPI';
import { Context } from '../../index';
import {toast} from 'react-toastify'

const CreateDevice = observer(({show, onHide}) => {
	const {device} = useContext(Context);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
	}, [])

	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}])
	}
	const removeInfo = (number) => {
		setInfo(info.filter(i => i.number !== number))
	}
	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
	}

	const selectFile = e => {
		setFile(e.target.files[0]);
	}

	const addDevice = () => {

		const formData = new FormData()
		formData.append('name', name.trim())
		formData.append('price', `${price}`)
		formData.append('img', file)
		formData.append('brandId', device.selectedBrand.id)
		formData.append('typeId', device.selectedType.id)
		formData.append('info', JSON.stringify(info))
		createDevice(formData).then(data => {
			if (data instanceof Error) {
				toast.error(data.message)
			} else {
				setName('')
				setPrice(0)
				onHide()
				toast.success("Device was successfully created")
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
					Add new Device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{device.selectedType.name || "Choose Type"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.types.map(type =>
								<Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className="mt-2 mb-2">
						<Dropdown.Toggle>{device.selectedBrand.name || "Choose Brand"}</Dropdown.Toggle>
						<Dropdown.Menu>
							{device.brands.map(brand =>
								<Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						className="mt-3"
						placeholder="Input the name of device"
						onChange={e => setName(e.target.value)}
					/>
					<Form.Control
						value={price}
						className="mt-3"
						placeholder="Input the price of device"
						type="number"
						onChange={e => setPrice(Number(e.target.value))}
					/>
					<Form.Control
						className="mt-3"
						type="file"
						onChange={selectFile}
					/>
					<hr/>
					<Button
						variant={"outline-dark"}
						onClick={addInfo}
					>
						Add new property
					</Button>
					{info.map(i => 
						<Row className="mt-4" key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={(e) => changeInfo('title', e.target.value, i.number)}
									placeholder="Input name of property"
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={(e) => changeInfo('description', e.target.value, i.number)}
									placeholder="Input description of property"
								/>
							</Col>
							<Col md={4}>
								<Button 
									variant={"outline-danger"}
									onClick={() => removeInfo(i.number)}
								>
									Delete
								</Button>
							</Col>
						</Row>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="outline-danger" onClick={onHide}>Close</Button>
				<Button variant="outline-success" onClick={addDevice}>Add</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateDevice;