import {makeAutoObservable} from "mobx";

export default class DeviceStore {
	constructor() {
		this._types = []
		this._brands = [
			{id: 1, name: 'Samsung'},
			{id: 2, name: 'Apple'},
			{id: 3, name: 'Lenovo'},
			{id: 4, name: 'Asus'},
			{id: 5, name: 'LG'},
			{id: 6, name: 'Blackberry'},
		]
		this._devices = [
			{id: 1, name: 'Iphone 12 pro', rating: 5, img: '', price: 1500},
			{id: 2, name: 'Iphone 10 pro', rating: 5, img: '', price: 2500},
			{id: 3, name: 'Iphone 11 pro', rating: 5, img: '', price: 3500},
			{id: 4, name: 'Iphone X', rating: 5, img: '', price: 1500},
			{id: 5, name: 'Iphone 10 pro', rating: 5, img: '', price: 15000},
			{id: 6, name: 'Iphone 11 pro', rating: 5, img: '', price: 15000},
			{id: 7, name: 'Iphone X', rating: 5, img: '', price: 15000},
		]
		this._selectedType = {}
		this._selectedBrand = {}
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

	setSelectedType(type) {
		this._selectedType = type
	}

	setSelectedBrand(brand) {
		this._selectedBrand = brand
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

	get selectedType() {
		return this._selectedType
	}

	get selectedBrand() {
		return this._selectedBrand
	}
}