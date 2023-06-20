const createError = require('http-errors');
const {Superhero, Superpower} = require("./../models");

module.exports.create = async (req, res, next) => {
    //todo: add ability to create superhero with his images
    const {body} = req;
    try {
        const superheroInstance = await Superhero.create(body);
        for (let i = 0; i < body.superpowers.length; i++) {
            const superpowerInstance = await Superpower.findAll({
                where: {
                    description: body.superpowers[i]
                }
            })
            superheroInstance.addSuperpower(superpowerInstance);
        }
        return res.status(201).send(superheroInstance);
    } catch (err) {
        next(err);
    }
};

module.exports.findOne = async (req, res, next) => {
    try {
        const {params: {superheroId}} = req;
        const superheroInstance = await Superhero.findByPk(superheroId, {returning: true});
        console.log(superheroInstance)
        if (!superheroInstance) {
            const error = createError(404, 'Superhero not found');
            next(error);
        }
        res.status(200).send({data: superheroInstance.dataValues});

    } catch (err) {
        next(err);
    }
};

module.exports.findAll = async (req, res, next) => {
    try {
        const {pagination} = req;
        console.log(pagination)
        const superheroes = await Superhero.findAll({
            attributes: {
                exclude: ['id']
            },
            ...pagination
        });
        res.status(200).send(superheroes);
    } catch (err) {
        next(err);
    }
};

module.exports.deleteOne = async (req, res, next) => {
    try {
        const {params: {superheroId}} = req;
        const deletedSuperheroInstance = await Superhero.destroy({
            where: {
                id: Number(superheroId)
            },
            returning: true
        })
        res.status(200).send({data: {rows: deletedSuperheroInstance}});
    } catch (err) {
        next(err);
    }
};

module.exports.updateOne = async (req, res, next) => {
    //todo: add ability to update superhero's images
    try {
        const {params: {superheroId}, body} = req;
        const superheroInstance = await Superhero.findByPk(superheroId);
        const updatedSuperheroInstance = await Superhero.update(body, {
            where:{
                id: Number(superheroId)
            }
        });
        for (let i = 0; i < body.superpowers.length; i++){
            const powerInstance = await Superpower.findAll({
                where: {
                    description: body.superpowers[i]
                }
            })
            superheroInstance.addSuperpower(powerInstance);
        }
        res.status(200).send({data: updatedSuperheroInstance});
    } catch (err) {
        next(err);
    }
};

module.exports.findSuperheroWithPowers = async (req, res, next) => {

}