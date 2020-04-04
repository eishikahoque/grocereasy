const express = require('express')

const OrderCtrl = require('../controllers/order-ctrl')

const router = express.Router()

router.post('/user/:user_id/order', OrderCtrl.createOrder)
router.get('/order/:id', OrderCtrl.getOrderById)
router.patch('/order/:id', OrderCtrl.updateOrder)

module.exports = router