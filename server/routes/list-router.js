const express = require('express')

const ListCtrl = require('../controllers/list-ctrl')

const router = express.Router()

router.post('/user/list', ListCtrl.createList)
router.put('/user/list/update', ListCtrl.updateList)
router.get('/list/:userId', ListCtrl.getList)

module.exports = router