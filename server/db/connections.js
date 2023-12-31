require('dotenv').config({path: 'config.env'})
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connexion = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connection", connexion.connection.host + " " + connexion.connection.db.databaseName)
    }catch(err){
        console.log("err")
        process.exit(1)
    }
}

module.exports = connectDB