const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const userController ={


    registerNewUser:async(req, res)=>{
        const {username, password, email} = req.body
        if(!username) return res.status(400).send({msg:"please provide a valid username"})
        if(!email) return res.status(400).send({msg:"please provide a valid email"})
        if(!password) return res.status(400).send({msg:"please provide a valid password"})

        try {
            const hashedPassword = await bcrypt.hash(password, 12)

            const newUser = new User({...req.body, password: hashedPassword})
            await newUser.save();
            return res.status(200).send({msg:"registration success", newUser})
        } catch (error) {
            console.log(error.message)
            return res.status(400).send({msg: error.message})
        }

    },
    loginNewUser: async(req, res) =>{
        const {username, password} = req.body
        if(!username) return res.status(400).send({msg:"please provide a valid username"})
        if(!password) return res.status(400).send({msg:"please provide a valid password"})
        try {
            const isUserExist = await User.findOne({username})
            if(!isUserExist) return res.status(400).send({msg:"username and password is not valid"})
            const isValid = await bcrypt.compare(password, isUserExist.password)
            if(!isValid) return res.status(400).send({msg:"username and password is not valid"})
            const token = jwt.sign({id:isUserExist._id},"JWTSCECRET", {expiresIn:'1d'})
            return res.status(200).send({...isUserExist._doc,password:"", token})
        } catch (error) {
            console.log(error.message)
            return res.status(400).send({msg: error.message})
        }
    }
}

module.exports = userController