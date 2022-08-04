import React, { useContext } from 'react';
import {BrowserRouter} from 'react-router-dom'
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import {observer} from "mobx-react-lite";
import {Context} from './index';
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = observer(() => {
	const {user} = useContext(Context)
		
	if (user.isLoading) {
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
