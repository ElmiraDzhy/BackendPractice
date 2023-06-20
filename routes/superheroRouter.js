const express = require('express');
const SuperheroController = require('../controllers/Superhero.controller');
const {pagination} = require("../middleware/pagination.mw");

const superheroRouter = express.Router();

superheroRouter.post('/', SuperheroController.create);
superheroRouter.get('/', pagination, SuperheroController.findAll);
superheroRouter.get('/:superheroId', SuperheroController.findOne);
superheroRouter.delete('/:superheroId', SuperheroController.deleteOne);
superheroRouter.patch('/:superheroId', SuperheroController.updateOne);

module.exports = superheroRouter;