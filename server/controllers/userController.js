const ApiError = require('../error/ApiError')
//const bcrypt = require('bcrypt')
//const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const userService = require('../service/userService')
/*
const generateJwt = (id, email, role) => {
	return jwt.sign(
		{id, email, role}, 
		process.env.JWT_ACCESS_SECRET,
		{expiresIn: '24h'}
	)
}
*/
class UserController {
	async registration(req, res, next) {
		try {
			const {email, password, role} = req.body
			
			if (!email || !password) {
				return next(ApiError.badRequest('Non-correct email or password'))
			}

			const userData = await userService.registration(email, password, role)
			console.log('!!! registration !!!');
			// save Refresh-token in cookie 30 days
			res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true}) // for hhtps add flag 'secure: true'

			return res.json(userData)
			/*const {email, password, role} = req.body
			if (!email || !password) {
				return next(ApiError.badRequest('Non-correct email or password'))
			}
			const candidate = await User.findOne({where: {email}})
			if (candidate) {
				return next(ApiError.badRequest('User with this email is already existed'))
			}
			const hashPassword = await bcrypt.hash(password, 5)
			const user = await User.create({email, role, password: hashPassword})
			const basket = await Basket.create({userId: user.id})
			const token = generateJwt(user.id, user.email, user.role)
			return res.json({token})*/
		} catch (e) {
			console.log(e);
			return next(ApiError.badRequest(e))
		}
	}

	async login(req, res, next) {
		/*console.log('1111111111111 ------- Login');
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
	}

	async logout(req, res, next) { // delete token from DB
		try {
			
		} catch (e) {
			
		}
	}

	async activate(req, res, next) { 
		try {
			
		} catch (e) {
			
		}
	}

	async refresh(req, res, next) { 
		try {
			
		} catch (e) {
			
		}
	}

	async getUsers(req, res, next) { 
		try {
			res.json(['123', '456'])
		} catch (e) {
			
		}
	}
	
}

module.exports = new UserController()