require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");

const items = require('./routes/api/items');
const themes = require('./routes/api/themes');
const user = require('./routes/api/user');

const fileUpload = require("express-fileupload");

const app = express();

// Bodyparser Middleware
app.use(express.json());
app.use(fileUpload());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// DB Config
// const db = require("./config/keys").mongoURI;

// Connect to Mongo
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items)
app.use('/api/themes', themes)
app.use('/api/user', user)

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));