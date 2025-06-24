const express = require('express')
const homerut = express.Router()
const path = require('path')

homerut.get(/^\/$|^\/index(\.html)?/,(req,res)=>{ 
    res.sendFile(path.join(__dirname,'..','views','index.html'))
})

module.exports = homerut