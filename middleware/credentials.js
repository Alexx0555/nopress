const allowedorg = require('../config/allowedorg')

const credentials = (req,res,next)=>{
    const origin = req.headers.origin;
    if(allowedorg.includes(origin)){
        res.setHeader('Access-Control-Allow-Credentials',true)
    }
    next()
}

module.exports = credentials