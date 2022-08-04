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
			// redirect to Client url
			return res.redirect(process.env.CLIENT_URL)
			return
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const {email, password} = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // for hhtps add flag 'secure: true'
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}
/*
	async check(req, res, next) {
		//const token = generateJwt(req.user.id, req.user.email, req.user.role)
		//return res.json({token})
		try {
			
		} catch (e) {
			next(e)
		}
	}
*/
	async logout(req, res, next) { // delete refresh-token from DB and clear cookie
		try {
			const {refreshToken} = req.cookies
			const token = await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) { 
		try {
			const {refreshToken} = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async getUsers(req, res, next) { 
		try {
			let arrUsers = []
			userService.getAllUsers().then((rows) => {
				rows.map((r) => {
					arrUsers.push(r)
				})
				return res.json(arrUsers)
			})
		} catch (e) {
			next(e)
		}
	}
	
}

module.exports = new UserController()