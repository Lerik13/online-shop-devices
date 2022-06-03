import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Button, Container} from 'react-bootstrap';

const NavBar = observer(() => {
	const {user} = useContext(Context)
	const history = useHistory();
	//console.log(user);

	const logOut =() => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.removeItem('token')
		history.push(SHOP_ROUTE)
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavLink style={{color: 'white'}} to={SHOP_ROUTE}>Buy Device</NavLink>
				{user.isAuth ?
					<Nav style={{marginLeft: 'auto', color: 'white'}}>
						{user.isAdmin && 
							<Button 
								variant={"outline-light"} 
								onClick={() => history.push(ADMIN_ROUTE)}
							>
								Admin panel
							</Button>
						}
						<Button 
							variant={"outline-light"}
							style={{marginLeft: '20px'}}
							onClick={() => logOut()}
						>
							Log out
						</Button>
					</Nav>
					:
					<Nav style={{marginLeft: 'auto', color: 'white'}}>
						<Button variant={"outline-light"} onClick={() => history.push(LOGIN_ROUTE)}>Autorization</Button>
					</Nav>
				}
			</Container>
	  </Navbar>
	);
});

export default NavBar;