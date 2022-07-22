const {Basket, BasketDevice, Device} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')

class BasketController {

	async add(req, res, next) {
		let {deviceId, qty} = req.body

		if (Number(qty) <= 0) {
			return next(ApiError.badRequest('Quantity should be more than zero'))
		}
		//console.log('*****************');
		//console.log('deviceId = '+ deviceId);

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
//console.log('!!!!!!!!!!!!!!!!!!!');
//console.log(dataBasketDevice);

			let data;
			if (dataBasketDevice) {
				//console.log('!!!!!!!!!!!!!!!!!!! UPDATE');
				if (!qty) { // if qty is undefined increase qty+1
					//console.log('+++++++++++++++++++ UPDATE');
					qty = Number(dataBasketDevice.qty) + 1
				}
				
				//console.log('qty = '+ qty);
				data = await BasketDevice.update({qty}, {where: {id: dataBasketDevice.id}})
			} else {
				//console.log('!!!!!!!!!!!!!!!!!!! CREATE');
				data = await BasketDevice.create({basketId: dataBasket.id, deviceId: deviceId})
			}
			
			return res.json(data)
		} catch(e) {
			return next(ApiError.badRequest('Error during adding device to basket'))
		}
	}

	async getAll(req, res) {
		//return res.json({message: 'basket'})
		const dataBasket = await Basket.findOne({ where: {userId: req.user.id}})
//console.log('------------------------');
		//const idBasket = dataBasket.id
		//console.log('idBasket = '+ idBasket);
		if (!dataBasket) {
			return ApiError.badRequest('ID of basket is not defined')
		}
		const dataBasketDevices = await BasketDevice.findAll({ where: {basketId: dataBasket.id}})
		//console.log(dataBasketDevices);
		return res.json(dataBasketDevices)
		//return res.json({'message': 'hi'})
	}

	async getQtyInBasket(req, res) {
		//return res.json({message: 'basket'})
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
		//console.log('*********************** Delete **********************:');
		//const {id} = req.params
		let {id} = req.body
		//console.log(id);
		if (!id) {
			return ApiError.badRequest('ID of item in basket is not defined')
		}
		const dataBasketDevice = await BasketDevice.findOne({ where: {id: id} })		
		if (!dataBasketDevice) {
			return ApiError.badRequest('Item with this Id is not found in basket')
		}

		try {
			const data = await dataBasketDevice.destroy(); 
			return res.json(data)
			//return {message: 'Ok'}
		} catch (e) {
			return ApiError.badRequest('Error during removing item from Basket')
		}
		
	}
}

module.exports = new BasketController()