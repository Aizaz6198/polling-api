const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 8000;

//mongoose
const db = require('./config/mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', require('./routes/index'));



//Setup Server
app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});