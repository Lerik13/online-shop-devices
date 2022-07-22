import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import { userRoutes, adminRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter = () => {
	const {user} = useContext(Context)
	
	return (
		<Switch>
			{user.isAuth && (user.isAdmin
				? adminRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)
				: userRoutes.map(({path, Component}) => <Route key={path} path={path} component={Component} exact />)
			)}
			{publicRoutes.map(({path, Component}) => 
				<Route key={path} path={path} component={Component} exact />
			)}
			<Redirect to={SHOP_ROUTE} />
		</Switch>
	);
};

export default AppRouter;