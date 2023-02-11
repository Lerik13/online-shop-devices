import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import {toast} from 'react-toastify'
import { qtyInBasket } from "../http/userAPI";
export default class UserStore {
	constructor() {
		this._user = {}
		this._isAuth = false
		this._isLoading = false
		makeAutoObservable(this)
	}

	setUser(user) {
		this._user = user
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setLoading(bool) {
		this._isLoading = bool
	}
	
	setQtyInBasket(qty) {
		if (!qty) {
			this._user.qtyInBasket = 0
		}
		this._user.qtyInBasket = Number(qty)
	}

	addOneQtyInBasket() {
		this._user.qtyInBasket += 1
	}

	refreshQtyInBasket() {
		qtyInBasket().then( res => this.setQtyInBasket(res) )
	}

	get isLoading(){
		return this._isLoading
	}

	get isAuth(){
		return this._isAuth
	}

	get isAdmin(){
		if (!this._user) return false;
		return this._user.role === 'ADMIN'
	}

	get user() {
		return this._user
	}

	get qtyInBasket() {
		return this._user.qtyInBasket
	}

	async login(email, password) {
		this.setLoading(true)
		try {
			const response = await AuthService.login(email, password)

			localStorage.setItem('token', response.data.accessToken)
			this.setIsAuth(true)
			this.setUser(response.data.user)
			return true;
		} catch (e) {
			toast.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async registration(email, password) {
		this.setLoading(true)
		try {
			const response = await AuthService.registration(email, password)

			localStorage.setItem('token', response.data.accessToken)

			toast.success("Please check your email to complete the registration")
		} catch (e) {
			toast.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		this.setLoading(true)
		try {
			await AuthService.logout()
			
			localStorage.removeItem('token')
			this.setIsAuth(false)
			this.setUser({})
		} catch (e) {
			toast.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async checkAuth() {
		//this.setLoading(true)
		try {
			const response = await AuthService.refresh()
			localStorage.setItem('token', response.data.accessToken)
			this.setIsAuth(true)
			this.setUser(response.data.user)
		} catch (e) {
			toast.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

}