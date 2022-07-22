const { validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')
const {Basket} = require('../models/models')
const userService = require('../service/userService')

class UserController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(ApiError.badRequest('Validation error', errors.array()))
			}

			const {email, password, role} = req.body

			const userData = await userService.registration(email, password, role)
			
			// save Refresh-token in cookie 30 days
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // for hhtps add flag 'secure: true'
			
			const basket = await Basket.create({userId: userData.user.id})

			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) { 
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			// redirect to client url
			return res.redirect(process.env.CLIENT_URL)
			return
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			
		} catch (e) {
			next(e)
		}
		/*
		const {email, password} = req.body
		const user = await User.findOne({where: {email}})
		if (!user) {
			return next(ApiError.internal('User with this email did not find'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Password is incorrect'))
		}
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({token})*/

	}

	async check(req, res, next) {
		/*const token = generateJwt(req.user.id, req.user.email, req.user.role)
		return res.json({token})*/
		try {
			
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) { // delete token from DB
		try {
			
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) { 
		try {
			
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) { 
		try {
			res.json(['123', '456'])
		} catch (e) {
			next(e)
		}
	}
	
}

module.exports = new UserController()