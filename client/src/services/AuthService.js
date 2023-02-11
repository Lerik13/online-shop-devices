//import { $authHost, $host } from "../http";
import $api from "../http";
import axios from "axios";
import { API_URL } from "../config";

export default class AuthService {
	static async login(email, password) {
		return $api.post('/user/login', {email, password})
	}

	static async registration(email, password) {
		return $api.post('/user/registration', {email, password})
	}

	static async logout() {
		return $api.post('/user/logout')
	}

	static async refresh() {
		return axios.get(`${API_URL}/user/refresh`, {withCredentials: true})
	}

}