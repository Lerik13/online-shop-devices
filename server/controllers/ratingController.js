const {Rating, Device} = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {

	async getRating(req, res, next) {

		const {deviceId} = req.params

		if (!deviceId) {
			return next(ApiError.badRequest('Device is not defined'))
		}

		const dataRating = await Rating.findOne({ where: {userId: req.user.id, deviceId}})
		
		if (!dataRating) {
			return res.json({'rate': 0})
		}

		return res.json(dataRating)
	}

	async add(req, res, next) {
		let {deviceId, rate} = req.body

		if (Number(rate) <= 0) {
			return next(ApiError.badRequest('Rate should be more than zero'))
		}

		if (!deviceId) {
			return next(ApiError.badRequest('Device is not defined'))
		}
		
		try {
			const dataRating = await Rating.findOne({ where: {userId: req.user.id, deviceId}})
			let data;
			
			if (dataRating) {
				data = await Rating.update({rate}, {where: {userId: req.user.id, deviceId}})
			} else{
				data = await Rating.create({userId: req.user.id, deviceId, rate})
			}

			// Calc average rating for device
			const dataRatingsForDevice = await Rating.findAll({ where: {deviceId}})
			
			let sum = 0
			let count = 0
			dataRatingsForDevice.map(row => { 
				count++
				sum += row.dataValues.rate
			})

			let average_rate = Math.round(sum/count)

			await Device.update({rating: average_rate}, {where: {id: deviceId}})
			
			return res.json(data)

		} catch(e) {
			return next(ApiError.badRequest('Error during adding rating to device'))
		}
	}	
}

module.exports = new RatingController()