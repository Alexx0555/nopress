const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyJWT = (req,res,next)=>{
    const authHeader = req.headers.authorization || req.headers.Authorization; 

    if(!authHeader?.startsWith('Bearer ')) { 
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err) {
                console.error("JWT verification failed:", err); 
                return res.sendStatus(403); 
            }

            req.user = decoded.userinfo.username;
            req.roles = decoded.userinfo.roles;
            console.log("Decoded JWT:", decoded);
            next();
        }
    );
}

module.exports = verifyJWT;