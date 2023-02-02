const { Brand, Device } = require('../models/models')
const ApiError = require('../error/ApiError')
class BrandController {

	async create(req, res, next) {
		const {name} = req.body

		if (!name) {
			return next(ApiError.badRequest('Name of brand is not defined'))
		}
		try {
			const brand = await Brand.create({name})
			return res.json(brand)
		} catch(e) {
			return next(ApiError.badRequest('Probably brand with this name is already exist'))
		}
	}

	async getAll(req, res) {
		const brands = await Brand.findAll()
		return res.json(brands)
	}

	async delete(req, res) {
		const {id} = req.params
		if (!id) {
			return ApiError.badRequest('ID of brand is not defined')
		}
		
		const brand = await Brand.findOne({ where: {id} })
		if (!brand) {
			return ApiError.badRequest('Brand with ID is not found')
		}
		
		const device = await Device.findOne({ where: {brandId: id} })
		if (device) {
			return ApiError.badRequest('Device with this brand is found. Delete all devices with this brand before.')
		}

		try {
			const brands = await brand.destroy(); 
			return res.json(brands)
			//return {message: 'Ok'}
		} catch (e) {
			return ApiError.badRequest('Error during removing brand')
		}
	}
}

module.exports = new BrandController()