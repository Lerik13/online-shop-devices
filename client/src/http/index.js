import axios from "axios";
import {toast} from 'react-toastify'
import { API_URL } from "../config";

const $api = axios.create({
	withCredentials: true,  // send cookie automaticly with request
	baseURL: API_URL
})

// Interceptor for Request
$api.interceptors.request.use((config) => {
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
})
// Interceptor for Response: check if access-token is expired => refresh token
$api.interceptors.response.use((config) => {
	return config
}, async (error) => {
	const originRequest = error.config
	if (error.response.status === 401 && error.config && !error.config._isRetry) { // avoid endless cycle
		originRequest._isRetry = true
		try {
			const response = await axios.get(`${API_URL}/user/refresh`, {withCredentials: true})
			localStorage.setItem('token', response.data.accessToken)
			// repeat origin request with new token
			return $api.request(originRequest)
		} catch (e) {
			toast.error('User is NOT authorized')
		}
	}
	throw error; // in case if-block does Not work, throw error in upper level
})

export default $api