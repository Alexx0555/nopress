const express = require('express')
const refreshrut = express.Router()
const refreshctrl = require('../controllers/refreshctrl')

refreshrut.get('/',refreshctrl.refresh)

module.exports = refreshrut