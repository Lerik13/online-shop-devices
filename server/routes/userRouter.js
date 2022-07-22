const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
// Check if user is authorized
router.get('/auth', authMiddleware, userController.check)

router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', userController.getUsers) //test end-point -- available only for authorized user

module.exports = router
