const express = require('express')
const logoutrut = express.Router()
const {logout} = require('../controllers/logoutctrl')

logoutrut.get('/',logout)

module.exports = logoutrut