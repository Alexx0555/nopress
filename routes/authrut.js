const express = require('express')
const authrut = express.Router()
const path = require('path')

const authctrl = require('../controllers/authctrl')

authrut.post('/',authctrl.login)

module.exports = authrut