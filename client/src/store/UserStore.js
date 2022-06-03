import {makeAutoObservable} from "mobx";

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._user = {}
		makeAutoObservable(this)
	}

	setIsAuth(bool) {
		this._isAuth = bool
	}

	setUser(user) {
		this._user = user
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
}