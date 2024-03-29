import React, { useContext, useState } from 'react';
import {observer} from 'mobx-react-lite';
import { Button, Card, Container, Form } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import {Context} from '../index';

const Auth = observer(() => {
	const {user} = useContext(Context)
	const location = useLocation() // hook for getting path in path string
	const navigate = useNavigate()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const click = async () => {
		
		if (isLogin) {
			user.login(email, password)
				.then(res => {
					if (res) {
						navigate(SHOP_ROUTE)
					}
				})
		} else {
			user.registration(email, password)
		}
	}

	return (
		<Container 
			className="d-flex justify-content-center align-items-center"
			style={{height: window.innerHeight - 54}}
		>
			<Card style={{width: 600}} className="p-5">
				<h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						className="mt-3"
						placeholder="Enter your email..."
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Enter your password..."
						type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
					<div className="d-flex justify-content-between mt-3">
						{isLogin ? 
							<div>
								Has no account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
							</div>
							:
							<div>
								Has account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
							</div>
						}
						<div>
							<Button 
								variant={"outline-success"}
								onClick={() => click()}
							>
								{isLogin ? 'Login' : 'Registration'}
							</Button>
						</div>
					</div>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;