const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth =async (req, res,next)=>{
    try {
    const bearerToken = req.headers.authorization
    const token = bearerToken.substring(7)
    if(!token) return res.status(401).send({msg: "no token"})

    const decodedToken = jwt.verify(token,"JWTSCECRET", )
    if(!decodedToken) return res.status(401).send({msg: "Invalid token"})
    const user = await User.findOne({_id:decodedToken.id})
    req.user =user
    next()
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg: error.message})
    }
    
        
}

module.exports = auth