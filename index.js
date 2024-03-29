require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/user-roles-perm") //127.0.0.1:27017 mongodb localhost server

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('public'));

//authRoute
const authRoute = require('./routes/authRoute')
app.use('/api',authRoute)

//adminRoute
const adminRoute = require('./routes/adminRoute')
app.use('/api/admin',adminRoute)


const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log("Server is running on Port:- "+port);
})