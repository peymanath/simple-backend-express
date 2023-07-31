require('dotenv').config();
const port = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');

// Config Express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', {}));

// Routes
const router = require('./src/routes');
app.use('/api', router);

// Run webserver
mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => console.log('connected to mongodb'))
    .catch(err => console.log(err));

app.listen(port, () => console.log(`listening on port ${port}`));
