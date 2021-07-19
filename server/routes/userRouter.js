const Router = require('express')
const router = new Router()

router.post('/registration',)
router.post('/login',)
// Check if user is autorized
router.get('/auth', (req, res) => {
	res.json({message: 'ALL WORKING'})
})

module.exports = router