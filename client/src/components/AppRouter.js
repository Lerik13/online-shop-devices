import React, { useContext, useEffect, useState } from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
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
		<Routes>
			{routes.map(({path, Component}) => 
				<Route key={path} path={path} element={<Component />} />
			)}
		
			{publicRoutes.map(({path, Component}) => 
				<Route key={path} path={path} element={<Component />} />
			)}
			<Route path="*" element={<Navigate to={SHOP_ROUTE} />} />
		</Routes>
	);
};

export default AppRouter;