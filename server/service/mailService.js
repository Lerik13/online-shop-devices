const nodemailer = require('nodemailer')

class MailService {
	constructor() {
		console.log('111');
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
		console.log('222 nodemailer:');
		console.log(nodemailer);
	}

	async sendActivationMail(to, link) {
		console.log('333');
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Activation of account in Device Store ' + process.env.API_URL,
			text: '',
			html:
				`
					<div>
						<h1>For activation please use this link: </h1>
						<a href="${link}">${link}</a>
					</div>
				`
		})
		console.log('444');
	}
}

module.exports = new MailService();