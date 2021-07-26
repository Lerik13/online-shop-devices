const jwt = require('jsonwebtoken')

module.exports = function(role) {
	return function(req, res, next) {
		if (req.method === 'OPTIONS') {
			next()
		}
		try {
			const token = req.headers.authorization.split(' ')[1] // Bearer asdsfdfgfgfgfhgf
			if (!token) {
				return res.status(401).json({message: "Not authorized"})
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY)
			if (decoded.role !== role){
				res.status(401).json({message: "No access!"})
			}
			req.user = decoded // data about token is accesible in any function
			next()
		} catch(e) {
			res.status(401).json({message: "Not authorized"})
		}
	}
}