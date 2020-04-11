const express = require('express')

const ListCtrl = require('../controllers/list-ctrl')

const router = express.Router()

router.post('/user/:user_id/list', ListCtrl.createList)
router.patch('/user/:user_id/list', ListCtrl.insertListItem)
router.patch('/user/:user_id/list/update/:_id', ListCtrl.updateListItem)
router.patch('/user/:user_id/list/delete/:_id', ListCtrl.deleteListItem)


module.exports = router