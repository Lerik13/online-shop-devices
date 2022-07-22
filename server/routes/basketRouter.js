const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require('../middlewares/authMiddleware')
//const checkUser = require('../middleware/checkUserMiddleware')

//router.post('/', checkUser('USER'), basketController.create)
//router.get('/', checkUser('USER'), basketController.getAll)
router.post('/', authMiddleware, basketController.add)
//router.delete('/:id', basketController.delete)
router.get('/', authMiddleware, basketController.getAll)
router.get('/qty/', authMiddleware, basketController.getQtyInBasket)
//router.delete('/:id', authMiddleware, basketController.delete)
router.delete('/', authMiddleware, basketController.delete)


module.exports = router