import {makeAutoObservable} from "mobx";

export default class DeviceStore {
	constructor() {
		this._types = [
			{id: 1, name: 'Fridge'},
			{id: 2, name: 'Phones'}
		]
		this._brands = [
			{id: 1, name: 'Samsung'},
			{id: 1, name: 'Apple'}
		]
		this._devices = [
			{id: 1, name: 'Iphone 12 pro', rating: 5, img: ''},
			{id: 2, name: 'Iphone 10 pro', rating: 5, img: ''},
			{id: 3, name: 'Iphone 11 pro', rating: 5, img: ''},
			{id: 4, name: 'Iphone X', rating: 5, img: ''}
		]

		makeAutoObservable(this)
	}

	setTypes(types) {
		this._types = types
	}

	setBrands(brands) {
		this._brands = brands
	}

	setDevices(devices) {
		this._devices = devices
	}

	get types(){
		return this._types
	}

	get brands() {
		return this._brands
	}

	get devices() {
		return this._devices
	}
}