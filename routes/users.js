const { Router } = require('express')
const User = require('../models/user')
const { getUsers, getUserById, createUser } = require('../controllers/users')

const router = Router()

router.get('/users', getUsers)
router.get('/users/:userId', getUserById)
router.post('/users', createUser)

module.exports = router