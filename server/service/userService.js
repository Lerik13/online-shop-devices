const bcrypt = require('bcrypt')
const uuid = require('uuid')
const {User} = require('../models/models')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../error/ApiError')

class UserService {
	async registration(email, password, role) {
		if (!email || !password) {
			throw ApiError.badRequest('Non-correct email or password')
		}

		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			throw ApiError.badRequest(`User with this email ${email} is already existed`)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const activationLink = uuid.v4(); // random string  Ex.: v54fa-764saf-sa-asf
		
		const user = await User.create({email, role, password: hashPassword, activationLink})
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
		
		const userDto = new UserDto(user) // id, email, role, isActivated
		const tokens = tokenService.geterateTokens({...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto}
	}

	async activate(activationLink) {
		const user = await User.findOne({where: {activationLink}})
		if (!user) {
			throw ApiError.badRequest('Uncorrect link for activation')
		}
		user.isActivated = true
		await user.save()
	}

	async login(email, password) {
		const user = await User.findOne({where: {email}})
		if (!user) {
			throw ApiError.badRequest('User with this email did not find')
		}
		const isPathEquals = bcrypt.compareSync(password, user.password) //compare
		if (!isPathEquals) {
			throw ApiError.internal('Password is incorrect')
		}

		const userDto = new UserDto(user)

		const tokens = tokenService.geterateTokens({...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return {...tokens, user: userDto}
	}
}

module.exports = new UserService();
