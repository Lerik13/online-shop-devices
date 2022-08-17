const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, ratingController.add)
router.get('/:deviceId', authMiddleware, ratingController.getRating)
//router.get('/qty/', authMiddleware, basketController.getQtyInBasket)
//router.delete('/:id', authMiddleware, basketController.delete)

module.exports = router