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
            return res.status(200).send({msg:"new Pin added", newPin})

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
    },
    updatePin: async(req, res) =>{

        const {username, title, desc, lat,long, } = req.body
        const{id} = req.params

        if(!username) return res.status(400).send({msg:"Please provise a valid username"})
        if(!title) return res.status(400).send({msg:"Please provide a title"})
        if(!lat || !long) return res.status(400).send({msg:"Please provide valid lat and long"})

        try {
            const pin = await Pin.findById(id)
           if(!pin) return res.status(400).send({msg:"no pin found"})
           const updatedPin = await Pin.findByIdAndUpdate(id, req.body, {new:true})
            return res.status(200).send({msg:"updated", updatedPin})
        } catch (error) {

            return res.status(500).send({msg:error.message})
            console.log(error)
        }
    },
    deletePin: async(req, res)=>{
        const {id} = req.params

        try {
            const pin = await Pin.findById(id)
            if(!pin) return res.status(400).send({msg:"no pin found"})
            const deletedPin = await Pin.findByIdAndDelete(id)
            return res.status(200).send({msg:"updated", deletedPin})

        } catch (error) {
            return res.status(500).send({msg:error.message})
            console.log(error)
        }
    }

}

module.exports =pinControllers;
