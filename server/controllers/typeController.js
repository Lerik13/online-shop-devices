const { Type, Device } = require('../models/models')
const ApiError = require('../error/ApiError')
class TypeController {
	async create(req, res, next) {
		const {name} = req.body

		if (!name) {
			return next(ApiError.badRequest('Name of type is not defined'))
		}
		try {
			const type = await Type.create({name})
			return res.json(type)
		} catch(e) {
			return next(ApiError.badRequest('Probably type with this name is already exist'))
		}
	}

	async getAll(req, res) {
		const types = await Type.findAll({ order: [['name', 'ASC']] })
		return res.json(types)
	}

	async delete(req, res) {
		const {id} = req.params
		if (!id) {
			return ApiError.badRequest('ID of type is not defined')
		}
		
		const type = await Type.findOne({ where: {id} })
		if (!type) {
			return ApiError.badRequest('Type with ID is not found')
		}
		
		const device = await Device.findOne({ where: {typeId: id} })
		if (device) {
			return ApiError.badRequest('Device with this type is found. Delete all devices with this type before.')
		}

		try {
			const types = await type.destroy(); 
			return res.json(types)
			//return {message: 'Ok'}
		} catch (e) {
			return ApiError.badRequest('Error during removing type')
		}
	}
}

module.exports = new TypeController()