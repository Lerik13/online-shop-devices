const {Basket, BasketDevice} = require('../models/models')
const { Sequelize } = require('../db');
const ApiError = require('../error/ApiError');

class BasketService {
	async getQtyInBasket(userId) {
		let dataBasket = await Basket.findOne({ where: {userId}})

		if (!dataBasket) {
			dataBasket = await Basket.create({userId})
			return 0;
			//return ApiError.badRequest('ID of basket is not defined')
		}
		const dataBasketDevices = await BasketDevice.findAll({
			attributes: [[Sequelize.fn('sum', Sequelize.col('qty')), 'qty']],
			where: {basketId: dataBasket.id}
		})

		let result = dataBasketDevices[0].dataValues.qty
		if (result === null || result === undefined) { result = 0 }
		return result
	}
}

module.exports = new BasketService();