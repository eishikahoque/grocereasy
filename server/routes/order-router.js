const express = require('express')

const OrderCtrl = require('../controllers/order-ctrl')

const router = express.Router()

router.post('/user/:user_id/order', OrderCtrl.createOrder)
router.get('/order/:id', OrderCtrl.getOrder)

module.exports = router