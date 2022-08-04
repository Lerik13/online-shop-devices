import React, { useContext, useEffect, useState } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { userRoutes, adminRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';

const AppRouter = () => {
	const {user} = useContext(Context)
	const [routes, setRoutes] = useState([]); // additional routes for authorized User or Admin

	useEffect(() => {

		if (localStorage.getItem('token')) {
			user.checkAuth()
				.then(res => {
					if (user.isAuth) {
						if (user.isAdmin){
							setRoutes(adminRoutes)
						} else {
							setRoutes(userRoutes)
						}
					}
				})
		}
	}, [user])
	

	return (
		<Switch>
			{routes.map(({path, Component}) => 
				<Route key={path} path={path} component={Component} exact />
			)}

			{publicRoutes.map(({path, Component}) => 
				<Route key={path} path={path} component={Component} exact />
			)}
			<Redirect to={SHOP_ROUTE} />
		</Switch>
	);
};

export default AppRouter;