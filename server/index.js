const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();
const app = express();
const PORT = 5000;
 app.use(express.json())
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connected to mangoDB"))
.catch(Err=>console.log(Err));

app.use('/api/pin', require('./routes/pinRoutes'))

app.listen(PORT, ()=> console.log(`running on ${PORT}`));