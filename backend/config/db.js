const mongoose = require("mongoose");
require('dotenv').config();
const URL = process.env.MONGODB_URL
// data base
mongoose.connect(
    'mongodb+srv://willem:gamez2023wil@cluster66.ouukkrz.mongodb.net/gamz',
    { useNewUrlParser: true, useUnifiedTopology: true }
   
    
).then( ()=>{
    console.log("Successfully connected to database")
}

).catch( (err)=>{
    console.log("dtabasa connexion error::::", err)
}

);
module.exports = mongoose;