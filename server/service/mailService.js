const nodemailer = require('nodemailer')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			service: "Gmail",
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			}
		})
	}

	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Activation of account in Device Store ' + process.env.API_URL,
			text: '',
			html:
				`
					<div>
						<h1>For activation Device-Store account please use this link: </h1>
						<a href="${link}">${link}</a>
					</div>
				`
		})
	}
}

module.exports = new MailService();