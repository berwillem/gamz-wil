const mongoose = require("mongoose");
require('dotenv').config();
const URL = process.env.MONGODB_URL
// data base
mongoose.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
   
    
).then( ()=>{
    console.log("Successfully connected to database")
}

).catch( (err)=>{
    console.log("dtabasa connexion error::::", err)
}

);
module.exports = mongoose;