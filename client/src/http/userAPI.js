import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
	const {data} = await $host.post('api/user/registration', {email, password})
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token) // return data about User
}

export const login = async (email, password) => {
	const {data} = await $host.post('api/user/login', {email, password})
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const check = async () => {
	const {data} = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const qtyInBasket = async () => {
	const {data} = await $authHost.get('api/basket/qty')
	return data.qty
}

export const addToBasket = async (deviceId, qty) => {
	const {data} = await $authHost.post('api/basket', {deviceId, qty})
	console.log(data);
	return data
}

export const fetchBasket = async () => {
	const {data} = await $authHost.get('api/basket')
	return data
}