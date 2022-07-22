const jwt = require('jsonwebtoken')

module.exports = function(id) {
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
			if (decoded.id !== id){
				res.status(401).json({message: "No access!"})
			}
			req.user = decoded // data about token is accessible in any function
			next()
		} catch(e) {
			res.status(401).json({message: "Not authorized"})
		}
	}
}