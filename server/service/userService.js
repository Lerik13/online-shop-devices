const bcrypt = require('bcrypt')
const uuid = require('uuid')
const {User, Basket} = require('../models/models')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/user-dto')

class UserService {
	async registration(email, password, role) {
		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			throw new Error(`User with this email ${email} is already existed`)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const activationLink = uuid.v4(); // random string  Ex.: v54fa-764saf-sa-asf
		
		const user = await User.create({email, role, password: hashPassword, activationLink})
		await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)
		
		const userDto = new UserDto(user) // id, email, role, isActivated
		const tokens = tokenService.geterateTokens({...userDto})
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		const basket = await Basket.create({userId: user.id})

		return {
			...tokens,
			user: userDto
		}
	}
}

module.exports = new UserService();