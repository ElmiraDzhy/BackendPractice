const express = require("express");
const router = require("./routes/apiRouter");

//create express app instance
const app = express();

//mount json body parser mw
app.use(express.json());

app.use('/api', router);

//static files
app.use(express.static('public/images'));

app.use(function (err, req, res, next) {
    console.log('error here')
    const statusErr = err.status || 500;
    res.status(statusErr).send({errors: err.message || 'Server error'});
})

module.exports = app;