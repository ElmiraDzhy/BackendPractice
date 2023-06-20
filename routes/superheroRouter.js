const express = require('express');
const SuperheroController = require('../controllers/Superhero.controller');
const {pagination} = require("../middleware/pagination.mw");
const {checkSuperpowers} = require('../middleware/check.superpowers.mw');

const superheroRouter = express.Router();

superheroRouter.post('/',checkSuperpowers, SuperheroController.create);
superheroRouter.get('/', pagination, SuperheroController.findAll);
superheroRouter.get('/:superheroId', SuperheroController.findOne);
superheroRouter.delete('/:superheroId', SuperheroController.deleteOne);
superheroRouter.patch('/:superheroId', checkSuperpowers, SuperheroController.updateOne);

module.exports = superheroRouter;