import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/starBig.png';
import {useParams} from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { addToBasket, fetchRating, addRating } from '../http/userAPI';
import {Context} from '../index';
import { SERVER_URL } from '../http';
import StarList from '../components/StarList';

const DevicePage = () => {
	const {user} = useContext(Context)
	const [device, setDevice] = useState({info: []});
	const {id} = useParams();
	const [rating, setRating] = useState(0);

	useEffect(() => {
		fetchOneDevice(id).then(data => setDevice(data))
		fetchRating(id).then(data => setRating(data))
	}, [])

	useEffect(() => {
		fetchOneDevice(id).then(data => setDevice(data))
	}, [rating])


	const addToCart = () => {
		addToBasket(id).then(
			user.addOneQtyInBasket()
		)
	}

	const setRatingForUser = (value) => {
		addRating(id, value).then(data => setRating(value))
	}

	return (
		<Container className="mt-3">
			<Row>
				<Col md={4}>
					<Image width={300} height={300} src={SERVER_URL +'/'+ device.img} />
				</Col>
				<Col md={4}>
					<div className="d-flex flex-column align-items-center">
						<h2>{device.name}</h2>
						<div 
							className="d-flex align-items-center justify-content-center"
							style={{background: `url(${bigStar}) no-repeat center center`, width:200, height:200, backgroundSize: 'cover', fontSize:64}}
						>
							{device.rating}
						</div>
						{user.isAuth &&
							<>
								<div className="d-flex justify-content-start">
									<div>your Rating is: {rating}</div>
								</div>
								<div className="d-flex justify-content-start">
									<StarList rating={rating} setRating={setRatingForUser} />
								</div>
							</>
						}
					</div>
				</Col>
				<Col md={4}>
					<Card
						className="d-flex flex-column align-items-center justify-content-around"
						style={{width:300, height:300, fontSize:32, border: '5px solid lightgray'}}
					>
						<h3>from: ${device.price}</h3>
						<Button variant={"outline-dark"} onClick={() => addToCart()}>Add to Cart</Button>
					</Card>
				</Col>
			</Row>

			<div className="d-flex flex-column mt-3">
				<h1>Features</h1>
				{device.info.map((info, index) => 
					<div key={info.id} className="d-flex" style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding:10}}>
						{info.title}: {info.description}
					</div>
				)}
			</div>
		</Container>
	);
};

export default DevicePage;