import $api from "./index";
import {toast} from 'react-toastify'

export const qtyInBasket = async () => {
	try {
		const {data} = await $api.get('/basket/qty')
		return data.qty
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}

export const addToBasket = async (deviceId, qty) => {
	try {
		const {data} = await $api.post('/basket', {deviceId, qty})
		return data
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}

export const deleteFromBasket = async (id) => {
	try {
		const {data} = await $api.delete('/basket/'+id)
		return data
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}

export const fetchBasket = async () => {
	try {
		const {data} = await $api.get('/basket')
		return data
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}

export const fetchRating = async (deviceId) => {
	try {
		const {data} = await $api.get('/rating/'+deviceId)
		return data.rate
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}

export const addRating = async (deviceId, rate) => {
	try {
		const {data} = await $api.post('/rating', {deviceId, rate})
		return data
	} catch (e) {
		toast.error(e.response?.data?.message)
	}
}
