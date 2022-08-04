//import { $authHost, $host } from "../http";
import $api from "../http";

export default class AuthService {
	static async login(email, password) {
		return $api.post('/user/login', {email, password})
		/*const {data} = await $host.post('api/user/login', {email, password})
		localStorage.setItem('token', data.token)
		return jwt_decode(data.token)		*/
	}

	static async registration(email, password) {
		return $api.post('/user/registration', {email, password})
	}

	static async logout(email, password) {
		return $api.post('/user/logout')
	}
}