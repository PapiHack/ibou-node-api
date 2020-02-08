const express = require('express')

const router = express.Router()

const userCtrl = require('../controllers/user')

router.get('/', userCtrl.getAllUser)
router.get('/:id', userCtrl.getSingleUser)
router.delete('/:id', userCtrl.deleteUser)
router.put('/:id', userCtrl.updateUser)

module.exports = router