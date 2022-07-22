import React, { useContext, useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite";
import {Context} from './index';
import {check, qtyInBasket} from './http/userAPI';
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = observer(() => {
	const {user} = useContext(Context)
	const [loading, setLoading] = useState(true)
	// function will implement only 1 time if array (2nd parameter) is empty
	const getQtyInBasket = async () => {
		return await qtyInBasket()
	}

	useEffect(() => {
		check().then(data => {
			user.setUser(data)
			user.setIsAuth(true)
			getQtyInBasket().then(data => user.setQtyInBasket(data)); 
		}).finally(() => setLoading(false))
	}, [user])

	if (loading) {
		return <Spinner animation={"grow"} />
	}

	return (
		<>
			<BrowserRouter>
				<NavBar />
				<AppRouter />
			</BrowserRouter>

			<ToastContainer />
		</>
	);
});

export default App;
