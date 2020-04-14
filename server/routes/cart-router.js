const express = require("express");

const CartCtrl = require("../controllers/cart-ctrl");

const router = express.Router();

router.post('/user/cart', CartCtrl.createCart)
router.put('/user/cart/update', CartCtrl.updateCart)
router.get('/cart/:userId', CartCtrl.getCart)
router.delete('/cart/:userId', CartCtrl.deleteCart)

module.exports = router;
