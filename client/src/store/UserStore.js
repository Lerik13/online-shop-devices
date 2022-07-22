import {makeAutoObservable} from "mobx";

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		this._qtyInBasket = 0
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setUser(user) {
		this._user = user
	}

	setQtyInBasket(qty) {
		if (!qty) {
			this._qtyInBasket = 0
		}
		this._qtyInBasket = qty
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
		return this._qtyInBasket
	}


}