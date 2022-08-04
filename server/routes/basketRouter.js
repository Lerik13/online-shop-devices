const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middlewares/authMiddleware')
//const checkUser = require('../middleware/checkUserMiddleware')

router.post('/', authMiddleware, basketController.add)
router.get('/', authMiddleware, basketController.getAll)
router.get('/qty/', authMiddleware, basketController.getQtyInBasket)
router.delete('/:id', authMiddleware, basketController.delete)

module.exports = router