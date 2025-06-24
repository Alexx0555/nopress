const express = require('express')
const regrut = express.Router()

const registerctrl = require('../controllers/registerctrl')

regrut.post('/',registerctrl.register)

module.exports = regrut