const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')

const router = express.Router()

router.post('/user', UserCtrl.createUser) //creates a new user
router.patch('/user/:id', UserCtrl.updateUser) //updates a user's information based on id
router.get('/user/:id', UserCtrl.getUser) //gets user based on id

module.exports = router
