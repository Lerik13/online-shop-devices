const {Brand} = require('../models/models')
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
}

module.exports = new BrandController()