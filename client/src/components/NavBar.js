import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { SHOP_ROUTE } from '../utils/consts';
import { NavLink } from 'react-router-dom';
import {Button, Container} from 'react-bootstrap';
import {observer} from 'mobx-react-lite';

const NavBar = observer(() => {
	const {user} = useContext(Context)

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
			<NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Buy device</NavLink>
			{user.isAuth ?
				<Nav style={{marginLeft: 'auto', color: 'white'}}>
					<Button variant={"outline-light"}>Admin panel</Button>
					<Button variant={"outline-light"} style={{marginLeft: '20px'}}>Enter</Button>
				</Nav>
				:
				<Nav style={{marginLeft: 'auto', color: 'white'}}>
					<Button variant={"outline-light"} onClick={() => user.setIsAuth(true)}>Autorization</Button>
				</Nav>
			}
			</Container>
	  </Navbar>
	);
});

export default NavBar;