const Pin = require("../models/Pin");

const pinControllers ={

    createNewPin: async(req, res)=>{
            const {username, title, desc, lat,long} = req.body

            if(!username) return res.status(400).send({msg:"Please provise a valid username"})
            if(!title) return res.status(400).send({msg:"Please provide a title"})
            if(!lat || !long) return res.status(400).send({msg:"Please provide valid lat and long"})
        try {
            
            const newPin = new Pin(req.body)
            await newPin.save()
            return res.status(200).send({msg:"new Pin added"})

        } catch (error) {

            return res.status(500).send({msg:error.message})
            console.log(error)
        }
    },
    getAllPins:async(req, res)=>{
        try {
            const pins = await Pin.find();
            return res.status(200).send(pins)
        } catch (error) {
            
        }
    }

}

module.exports =pinControllers;
