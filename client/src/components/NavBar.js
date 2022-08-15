import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from '../utils/consts';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button, Container, Image} from 'react-bootstrap';
import shoppingCart from '../assets/shoppingCart.svg';

const NavBar = observer(() => {
	const {user} = useContext(Context)
	const history = useHistory();

	const logOut = () => {
		user.logout()
		history.push(SHOP_ROUTE)
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Buy Device</NavLink>
				<Nav style={{marginLeft: 'auto', color: 'white'}}>
					{!user.isAuth ?
						<Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Autorization</Button>
					: <>
						{user.isAdmin ? 
							<Button 
								variant={"outline-light"} 
								onClick={() => history.push(ADMIN_ROUTE)}
							>
								Admin panel
							</Button>
							:
							<Button 
								variant={"outline"}
								style={{position: "relative"}}
								onClick={() => history.push(BASKET_ROUTE)}
							>
								<Image width={28} height={28} src={shoppingCart} />
								<span style={{color: "#0d6efd", position: "absolute", top: "-9px", left: "23px"}}>{user.qtyInBasket}</span>
							</Button>
						}

						<Button 
							variant={"outline-light"}
							style={{marginLeft: '20px'}}
							onClick={() => logOut()}
						>
							Log out
						</Button>
					</>
					}
				</Nav>
			</Container>
	  </Navbar>
	);
});

export default NavBar;