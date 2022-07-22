require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors()) 		// to send requests from browser
app.use(express.json()) // app could parse JSON format
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static'))) // for access static files like imgs
app.use(fileUpload({}))
app.use('/api', router)

// Error Handling = the last Middleware
app.use(errorHandler)

const start = async () => {
	try {
		// connect to database
		await sequelize.authenticate()
		// Verify Database State with Data Schema
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e);
	}
}

start()
