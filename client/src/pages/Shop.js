import React, { useContext, useEffect } from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import TypeBar from '../components/TypeBar';
import BrandBar from '../components/BrandBar';
import DeviceList from '../components/DeviceList';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { fetchTypes, fetchBrands, fetchDevices } from '../http/deviceAPI';
import Pages from '../components/Pages';
import { SHOW_DEVICES_PER_PAGE } from '../utils/consts';

const Shop = observer(() => {
	const {device} = useContext(Context)
	const limit = SHOW_DEVICES_PER_PAGE // show 3 devices per page

	useEffect(() => {
		fetchTypes().then(data => device.setTypes(data))
		fetchBrands().then(data => device.setBrands(data))
		fetchDevices(null, null, 1, limit).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [])

	useEffect(() => {
		fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, limit).then(data => {
			device.setDevices(data.rows)
			device.setTotalCount(data.count)
		})
	}, [device.page, device.selectedType, device.selectedBrand])

	return (
		<Container>
			<Row className="mt-3">
				<Col md={3}>
					<TypeBar />
				</Col>
				<Col md={9}>
					<BrandBar />
					<DeviceList />
					<Pages />
				</Col>
			</Row>
		</Container>
	);
});

export default Shop;