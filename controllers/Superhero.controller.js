const createError = require('http-errors');
const {Superhero, Superpower, Image} = require("./../models");

module.exports.create = async (req, res, next) => {
    try {
        const pathArray = [...req.files].map(file => file.filename);
        const {body: {payload}} = req;

        const superheroBody = JSON.parse(payload);
        const superheroInstance = await Superhero.create(superheroBody);

        if (superheroBody.superpowers) {
            for (let i = 0; i < superheroBody.superpowers.length; i++) {
                const superpowerInstance = await Superpower.findAll({
                    where: {
                        description: superheroBody.superpowers[i]
                    }
                })
                await superheroInstance.addSuperpower(superpowerInstance);
            }
        }

        for (const path of pathArray) {
            await Image.create({ path: path, superhero_id:  superheroInstance.id });
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
        });

        res.status(200).send({data: {rows: deletedSuperheroInstance}});
    } catch (err) {
        next(err);
    }
};

module.exports.updateOne = async (req, res, next) => {
    try {
        const pathArray = [...req.files].map(file => file.filename);
        const {params: {superheroId}, body: {payload}} = req;
        const body = JSON.parse(payload);

        const superheroInstance = await Superhero.findByPk(superheroId);
        const updatedSuperheroInstance = await Superhero.update(body, {
            where: {
                id: Number(superheroId)
            }
        });

        if (body.superpowers) {
            for (let i = 0; i < body.superpowers.length; i++) {
                const powerInstance = await Superpower.findAll({
                    where: {
                        description: body.superpowers[i]
                    }
                });
                await superheroInstance.addSuperpower(powerInstance);
            }
        }

        for (const path of pathArray) {
            await Image.create({ path, superhero_id: superheroId });
        }

        res.status(200).send({data: updatedSuperheroInstance});
    } catch (err) {
        next(err);
    }
};

module.exports.findSuperheroWithPowers = async (req, res, next) => {
    try {
        const {params: {superheroId}} = req;
        const superheroWithPowers = await Superhero.findAll({
            include: [{
                model: Superpower,
            }],
            where: {
                id: Number(superheroId)
            }
        })

        res.status(200).send({data: superheroWithPowers})
    } catch (err) {
        next(err);
    }
}