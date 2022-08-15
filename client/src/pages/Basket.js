import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../index';
import { deleteFromBasket, fetchBasket } from '../http/userAPI';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { SERVER_URL } from '../http';
import { toast } from 'react-toastify';

const Basket = observer(() => {
	const {user} = useContext(Context)	
	const [devices, setDevices] = useState([]);
	const [total, setTotal] = useState(0);
	const [isDataChanged, setIsDataChanged] = useState(false);

	useEffect(() => {
		fetchBasket().then(data => {
	
			const arrDevices = [...data]
			setTotal(0)
			setDevices([]);

			arrDevices.map((device, index) => {
				fetchOneDevice(device.deviceId).then(dataDevice => {
					arrDevices[index] = {...arrDevices[index], 'name': dataDevice['name'], 'img': dataDevice['img'], 'price': dataDevice['price']}
					setDevices(arr => [ ...arr, arrDevices[index] ]);
					setTotal(prev =>  prev + dataDevice['price'] * arrDevices[index]['qty'])
				})
			})
		})
	}, [isDataChanged])

	const DeleteFromCart = (idBasket) => {
		if (window.confirm("Are you sure you want to delete device from your cart?") === true) {
			const res = deleteFromBasket(idBasket)
			if (res) {
				setIsDataChanged(!isDataChanged)
				user.refreshQtyInBasket()
				//toast.success('Item was deleted succesfully');
			} 
		}
	}

	return (
		<Container>
			<h1>Basket</h1>

			<div className="d-flex flex-column mt-3">
				{devices.map((device, index) => 
					<Row key={device.id} className="d-flex" style={{padding:10, borderBottom: '1px solid gray'}}>
						<Col xs={1}>
							<Image width={50} height={50} src={SERVER_URL +'/'+ device.img} />
						</Col>
						<Col xs={8} className="d-flex align-self-center">
							<div>{device.name}</div>
						</Col>
						<Col xs={1} className="d-flex align-self-center">
							{device.qty}
						</Col>
						<Col xs={1} className="d-flex align-self-center">
							${device.price * device.qty}
						</Col>
						<Col xs={1} className="d-flex align-self-center">
							<Button variant="outline-danger" onClick={() => DeleteFromCart(device.id)}>X</Button>
						</Col>
					</Row>
				)}
				<Row className="d-flex" style={{padding:10, fontWeight: 'bold'}}>
					<Col xs={9} className="d-flex"></Col>
					<Col xs={1} className="d-flex align-self-center">Total:</Col>
					<Col xs={1} className="d-flex align-self-center">${total}</Col>
				</Row>
			</div>
		</Container>
	);
});

export default Basket;