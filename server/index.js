const express = require('express');
const app = express();
require('dotenv').config({path:'./config.env'})
const mongoConnection = require('./db/connections');
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,  
}));
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cookieParser())

const UserRoutes = require('./routes');
const NotesRoutes = require('./notesRoutes');

mongoConnection().then(() => {
    app.listen(3000,(req,res) => {
        console.log("readmon PORT "+3000);
    })
})

app.use(UserRoutes);
app.use(NotesRoutes);
