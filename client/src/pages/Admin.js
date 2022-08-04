/*import React, {useState} from 'react';
import { Button, Container } from 'react-bootstrap';
import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false)
	const [typeVisible, setTypeVisible] = useState(false)
	const [deviceVisible, setDeviceVisible] = useState(false)
	
	return (
		<Container className="d-flex flex-column align-items-center justify-content-center">
			<Button 
				variant={"outline-dark"} 
				className="mt-4 p-2"
				style={{width: '200px'}}
				onClick={() => setTypeVisible(true)}
			>
				Add Type
			</Button>
			<Button 
				variant={"outline-dark"} 
				className="mt-4 p-2"
				style={{width: '200px'}}
				onClick={() => setBrandVisible(true)}
			>
				Add Brand
			</Button>
			<Button 
				variant={"outline-dark"} 
				className="mt-4 p-2"
				style={{width: '200px'}}
				onClick={() => setDeviceVisible(true)}
			>
				Add Device
			</Button>
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
		</Container>
	);
};

export default Admin;*/