const express = require('express');
const upload = require('../utils/multer');
const SuperheroController = require('../controllers/Superhero.controller');
const {pagination} = require("../middleware/pagination.mw");
const {checkSuperpowers} = require('../middleware/check.superpowers.mw');
const {checkPayload} = require('../middleware/check.payload.mw');


const superheroRouter = express.Router();

superheroRouter.post('/', upload.array('image', 10), checkPayload, checkSuperpowers, SuperheroController.create);
superheroRouter.get('/', pagination, SuperheroController.findAll);
superheroRouter.get('/:superheroId', SuperheroController.findOne);
superheroRouter.delete('/:superheroId', SuperheroController.deleteOne);
superheroRouter.patch('/:superheroId', upload.array('image', 10), checkPayload, checkSuperpowers, SuperheroController.updateOne);
superheroRouter.get('/:superheroId/powers', SuperheroController.findSuperheroWithPowers);

module.exports = superheroRouter;