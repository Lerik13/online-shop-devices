//const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')
const tokenService = require('../service/tokenService')

module.exports = function(role) {
	return function(req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const authorizationHeader = req.headers.authorization
			if (!authorizationHeader) {
				return next(ApiError.unautorizedError())
			}
			const accessToken = authorizationHeader.split(' ')[1] // Bearer asdsfdfgfgfgfhgf
			if (!accessToken) {
				return next(ApiError.unautorizedError())
			}
			
			const userData = tokenService.validateAccessToken(accessToken)
			if (!userData) {
				return next(ApiError.unautorizedError())
			}

			if (userData.role !== role){
				return next(ApiError.noaccessError())
			}

			req.user = userData 
			next()
		} catch(e) {
			return next(ApiError.unautorizedError())
		}
	}
}