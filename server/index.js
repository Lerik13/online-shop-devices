require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json()) // чтобы приложение могло парсить JSON формат
app.use('/api', router)
/*
app.get('/', (req, res) => {
	res.status(200).json({message: 'WORKING!!!'})
})
*/
const start = async () => {
	try {
		// подключение к базе данных
		await sequelize.authenticate()
		// сверяет состояние базы данных со схемой данных
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
	} catch (e) {
		console.log(e);
	}
}

start()
