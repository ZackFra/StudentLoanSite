const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const DataRoute = require('./routes/DataRoute');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

require('dotenv').config();

const app = express();


app.use(bodyParser.json());
app.use('/Data', DataRoute);

const URI = process.env.ATLAS_URI;

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then( res => {
    console.log('MongoDB connected');
})
.catch( err => {
    console.log(err);
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
