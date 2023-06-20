const express = require("express");
const superheroRouter = require('./superheroRouter');
const apiRouter = express.Router();

apiRouter.use('/superheroes/', superheroRouter);

module.exports = apiRouter;