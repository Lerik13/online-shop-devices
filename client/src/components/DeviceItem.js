import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png';

const DeviceItem = ({device}) => {
	return (
		<Col md={3} className={"mt-3"}>
			<Card
				style={{width: 150, cursor: 'pointer'}}
				border={"light"}
			>
				<Image width={150} height={150} src={device.img} />
				<div className="d-flex justify-content-between align-items-center">
					<div className="text-black-50">Samsung...</div>
					<div className="d-flex align-items-center mt-1">
						<div>{device.rating}</div>
						<Image width={18} height={18} src={star} />
					</div>
				</div>
				<div>{device.name}</div>
			</Card>
		</Col>
	);
};

export default DeviceItem;