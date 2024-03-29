const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo, BasketDevice } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
	async create(req, res, next) {
		try {
			const {name, price, brandId, typeId, info} = req.body
			if (!name) {
				return next(ApiError.badRequest('Name of device is not defined'))
			}
			if (!brandId || brandId === 'undefined') {
				return next(ApiError.badRequest('Brand of device is not defined'))
			}
			if (!typeId || typeId === 'undefined') {
				return next(ApiError.badRequest('Type of device is not defined'))
			}

			if (!req.files) {
				return next(ApiError.badRequest('Image file is not defined'))
			}
			const {img} = req.files
			let fileName = uuid.v4() + ".jpg"
			img.mv(path.resolve(__dirname, '..', 'static', fileName))
			const device = await Device.create({ name, price, brandId, typeId, img: fileName })

			if (info) {
				const info_array = JSON.parse(info)
				info_array.forEach(i => {
					if (i.title && i.description) {
						DeviceInfo.create({ 
							title: i.title,
							description: i.description,
							deviceId: device.id
						})
					}}
				)
			}
			
			return res.json(device);
	
		} catch(e) {
			next(ApiError.badRequest(e.message))
		}
	}

	async getAll(req, res) {
		let {brandId, typeId, limit, page} = req.query;
		page = page || 1;
		limit = limit || 9;
		let offset = page * limit - limit;

		let devices;

		if (!brandId && !typeId) {
			// use func "findAndCountAll" instead "findAll" to know how many devices totally => for pagination
			devices = await Device.findAndCountAll({ limit, offset })
		}
		if (brandId && !typeId) {
			devices = await Device.findAndCountAll({ where: {brandId}, limit, offset })
		}
		if (!brandId && typeId) {
			devices = await Device.findAndCountAll({ where: {typeId}, limit, offset })
		}
		if (brandId && typeId) {
			devices = await Device.findAndCountAll({ where: {typeId, brandId}, limit, offset })
		}
		return res.json(devices)
	}

	async getOne(req, res) {
		const {id} = req.params
		const device = await Device.findOne(
			{
				where: {id},
				include: [{model: DeviceInfo, as: 'info'}]
			}
		)
		return res.json(device)
	}

	async delete(req, res) {
		const {id} = req.params
		if (!id) {
			return ApiError.badRequest('ID of device is not defined')
		}
		
		const device = await Device.findOne({ where: {id} })
		if (!device) {
			return ApiError.badRequest('Device with ID is not found')
		}
		
		const basket = await BasketDevice.findOne({ where: {deviceId: id} })
		if (basket) {
			return ApiError.badRequest('Sorry, you cannot delete device! As it is found in user`s basket.')
		}

		try {
			const devices = await device.destroy(); 
			return res.json(devices)
			//return {message: 'Ok'}
		} catch (e) {
			return ApiError.badRequest('Error during removing device')
		}
	}

}

module.exports = new DeviceController()
