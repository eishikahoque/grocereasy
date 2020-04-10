const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', UserCtrl.createUser)
router.patch('/user/:id', UserCtrl.updateUser)
router.get('/login/:email', UserCtrl.loginUser)

module.exports = router