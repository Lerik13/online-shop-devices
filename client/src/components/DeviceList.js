import React, { useContext } from 'react';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import DeviceItem from './DeviceItem';

const DeviceList = observer(() => {
	const {device} = useContext(Context);
	
	const getBrandName = (id) => {
		for (let i = 0; i < device.brands.length; i++) {
			const brand = device.brands[i];
			if (brand.id === id) {
				return brand.name
			}
		}
		return ''
	}

	return (
		<div className="d-flex flex-wrap">
			{device.devices.map(device =>
				<DeviceItem 
					key={device.id} 
					device={device} 
					brandName={getBrandName(device.brandId)}
				/>
			)}
		</div>
	);
});

export default DeviceList;