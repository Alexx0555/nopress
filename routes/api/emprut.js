const express = require('express')
const emprut = express.Router()
const { getAll,getOne,update,create,del} = require('../../controllers/empctrl')
const roles = require('../../config/roles')
const verifyRoles = require('../../middleware/verifyRoles')

emprut.route('/')
    .get(getAll)
    .put(verifyRoles(roles.Admin,roles.Editor),update)  
    .post(verifyRoles(roles.Admin,roles.Editor),create)
    .delete(verifyRoles(roles.Admin),del)

emprut.route('/:id')
    .get(getOne)

module.exports = emprut