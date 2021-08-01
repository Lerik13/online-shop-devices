import React from 'react';
import { Button, Card, Col, Container, Image } from 'react-bootstrap';
import bigStar from '../assets/starBig.png';

const DevicePage = () => {
	const device = {id: 1, name: 'Iphone 12 pro', rating: 5, img: '', price: 1000};
	const description = [
		{id:1, title: 'Operative memory', description: '5Gb'},
		{id:2, title: 'Camera', description: '12 mp'},
		{id:3, title: 'Processor', description: 'Pentium 3'},
		{id:4, title: 'Quantity of Cores', description: '2'},
		{id:5, title: 'Accumulator', description: '4000'},
	];

	return (
		<Container className="mt-3">
			<div className="d-flex">
				<Col md={4}>
					<Image width={300} height={300} src={device.img} />
				</Col>
				<Col md={4}>
					<div className="d-flex flex-column align-items-center">
						<h2>{device.name}</h2>
						<div 
							className="d-flex align-items-center justify-content-center"
							style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
						>
							{device.rating}
						</div>
					</div>
				</Col>
				<Col md={4}>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
					>
						<h3>from: {device.price} $</h3>
						<Button variant={"outline-dark"}>Add to Cart</Button>
					</Card>
				</Col>
			</div>
			<div className="d-flex flex-column mt-3">
				<h1>Features</h1>
				{description.map((info, index) => 
					<div key={info.id} className="d-flex" style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}>
						{info.title}: {info.description}
					</div>
				)}
			</div>
		</Container>
	);
};

export default DevicePage;