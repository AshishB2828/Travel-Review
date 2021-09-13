const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
app.use(express.json())
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("connected to mangoDB"))
.catch(Err=>console.log(Err));

app.use('/api/pins', require('./routes/pinRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, ()=> console.log(`running on ${PORT}`));