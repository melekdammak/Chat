const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./server/config/passport');
const app = express();
mongoose.connect('mongodb://localhost:27017/CHAT', { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) throw err;
})
app.use(bodyParser.json());
app.use(cors());


// ROUTES

const auth = require('./server/routes/auth')
app.use('/auth', auth)

const user = require('./server/routes/user')
app.use('/user', user)


app.listen(3000, (err) => {
    if (err) throw err;
    console.log('server is running on port 3000')
})