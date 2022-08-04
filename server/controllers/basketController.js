const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')

class BasketController {

	async add(req, res, next) {
		let {deviceId, qty} = req.body

		if (Number(qty) <= 0) {
			return next(ApiError.badRequest('Quantity should be more than zero'))
		}

		if (!deviceId) {
			return next(ApiError.badRequest('Device is not defined'))
		}
		
		try {
			const dataDevice = await Device.findOne({ where: {id: deviceId} })
			if (!dataDevice) {
				return ApiError.badRequest('Device with ID is not found')
			}
	
			const dataBasket = await Basket.findOne({ where: {userId: req.user.id}})
			if (!dataBasket) {
				return ApiError.badRequest('ID of basket is not defined')
			}
			const dataBasketDevice = await BasketDevice.findOne({ where: {basketId: dataBasket.id, deviceId}})

			let data;
			if (dataBasketDevice) {
				if (!qty) { // if qty is undefined increase qty+1
					qty = Number(dataBasketDevice.qty) + 1
				}
				data = await BasketDevice.update({qty}, {where: {id: dataBasketDevice.id}})
			} else {
				data = await BasketDevice.create({basketId: dataBasket.id, deviceId: deviceId})
			}
			
			return res.json(data)
		} catch(e) {
			return next(ApiError.badRequest('Error during adding device to basket'))
		}
	}

	async getAll(req, res) {
		const dataBasket = await Basket.findOne({ where: {userId: req.user.id}})
		
		if (!dataBasket) {
			return ApiError.badRequest('ID of basket is not defined')
		}
		const dataBasketDevices = await BasketDevice.findAll({ where: {basketId: dataBasket.id}})
		return res.json(dataBasketDevices)
	}

	async getQtyInBasket(req, res) {
		const dataBasket = await Basket.findOne({ where: {userId: req.user.id}})

		if (!dataBasket) {
			return ApiError.badRequest('ID of basket is not defined')
		}
		const dataBasketDevices = await BasketDevice.findAll({
			attributes: [[Sequelize.fn('sum', Sequelize.col('qty')), 'qty']],
			where: {basketId: dataBasket.id}
		})
		return res.json(dataBasketDevices[0])
	}

	async delete(req, res) {
		const {id} = req.params

		if (!id) {
			return ApiError.badRequest('ID of item in basket is not defined')
		}

		const dataBasketDevice = await BasketDevice.findOne({ where: {id: id} })
		if (!dataBasketDevice) {
			return ApiError.badRequest('Item with this Id is not found in basket')
		}
		try {
			const data = await dataBasketDevice.destroy(); 
			return true
		} catch (e) {
			return ApiError.badRequest('Error during removing item from Basket')
		}
		
	}
}

module.exports = new BasketController()