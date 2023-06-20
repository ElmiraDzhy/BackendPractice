const express = require('express');
const SuperheroController = require('../controllers/Superhero.controller');
const multer = require('multer');
const path = require('path');
const {pagination} = require("../middleware/pagination.mw");
const {checkSuperpowers} = require('../middleware/check.superpowers.mw');

const STATIC_PATH = path.resolve(__dirname, '../public/images');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, STATIC_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`);
    },
})
const upload = multer({storage});

const superheroRouter = express.Router();

superheroRouter.post('/', upload.array('image', 10), checkSuperpowers, SuperheroController.create);
superheroRouter.get('/', pagination, SuperheroController.findAll);
superheroRouter.get('/:superheroId', SuperheroController.findOne);
superheroRouter.delete('/:superheroId', SuperheroController.deleteOne);
superheroRouter.patch('/:superheroId', checkSuperpowers, SuperheroController.updateOne);
superheroRouter.get('/:superheroId/powers', SuperheroController.findSuperheroWithPowers);

module.exports = superheroRouter;