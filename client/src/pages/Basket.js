import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Context } from '../index';
import { fetchBasket } from '../http/userAPI';
import { fetchOneDevice } from '../http/deviceAPI';
import { observer } from 'mobx-react-lite';

const Basket = observer(() => {
	const {user} = useContext(Context)
	const [devices, setDevices] = useState([]);

	useEffect(() => {
		fetchBasket().then(data => {
	
			const arrDevices = [...data]
	
			arrDevices.map((device, index) => {
				fetchOneDevice(device.deviceId).then(dataDevice => {
					arrDevices[index] = {...arrDevices[index], 'name': dataDevice['name'], 'img': dataDevice['img']}
					setDevices(arr => [ ...arr, arrDevices[index] ]);
				})
			})
		})
	}, [])

	return (
		<Container>
			<h1>Basket</h1>

			<div className="d-flex flex-column mt-3">
				{devices.map((device, index) => 
					<div key={device.id} className="d-flex" style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}>
						id={device.id};  deviceId={device.deviceId};  qty={device.qty};  name={device.name};  img={device.img}
						{console.log('! Show index: '+index)}
						{console.log(device)}
					</div>
				)}
			</div>
		</Container>
	);
});

export default Basket;