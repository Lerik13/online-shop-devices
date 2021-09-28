import React, { useContext, useEffect } from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchTypes } from '../http/deviceAPI';

const Shop = observer(() => {
	const {device} = useContext(Context)
	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
	}, [])

	return (
		<Container>
			<Row className="mt-3">
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;